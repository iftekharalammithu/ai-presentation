"use server";
import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 } from "uuid";

export const generateCreativePrompt = async (userPrompt: string) => {
  const MODEL_NAME = "gemini-1.5-pro";
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!API_KEY) {
    return { status: 500, error: "GOOGLE_API_KEY is not set." };
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of at least 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic. 
    Return the output in the following JSON format:
    
    {
      "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
      ]
    }
    
    Strictly return ONLY the JSON format above. Do not include any other text, explanations, or markdown formatting outside the JSON. do not use any Backtick marks.
    `;

  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 1000,
  };

  const parts = [{ text: finalPrompt }];
  const contents = [{ role: "user", parts }]; // Added the role
  // console.log("working");

  try {
    const result = await model.generateContent({
      contents,
      generationConfig,
    });
    const response = result.response;
    const text =
      response.candidates && response.candidates.length > 0
        ? response.candidates[0].content.parts[0].text
        : undefined;
    if (text) {
      try {
        // console.log(text);
        const jsonResponse = JSON.parse(text);
        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return { status: 500, error: "Internal Server Error - JSON Parsing" };
      }
    }
    return { status: 400, error: "No Content generated" };
  } catch (error) {
    console.error("Error in generateCreativePrompt:", error);
    return { status: 500, error: "Internal Server Error - Gemini API" };
  }
};

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === "image") {
    images.push(layout);
  }
  if (Array.isArray(layout.content)) {
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (layout.content && typeof layout.content === "object") {
    images.push(...findImageComponents(layout.content));
  }
  return images;
};

const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const improvedPrompt = `
    Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

    Description: ${prompt}

    Important Notes:
    - The image must be in a photorealistic style and visually compelling.
    - Ensure all text, signs, or visible writing in the image are in English.
    - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
    - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
    - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

    Example Use Cases: Business presentations, educational slides, professional designs.
  `;
    const MODEL_NAME = "gemini-pro-vision";
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!API_KEY) {
      return "GOOGLE_API_KEY is not set.";
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      // Generate content based on the prompt
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: improvedPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      // Get the response
      const response = result.response;

      // If the response contains image data
      if (response.candidates && response.candidates[0]?.content?.parts) {
        const imageParts = response.candidates[0].content.parts.filter(
          (part) =>
            part.inlineData && part.inlineData.mimeType.startsWith("image/")
        );

        if (imageParts.length > 0) {
          // Return the image data
          return (
            imageParts[0]?.inlineData?.data || "https://placehold.co/1024x1024"
          );
        }
      }

      // If no image was generated, return the text response
      return "No image was generated.";
    } catch (error) {
      console.error(error);
      return "An error occurred while generating the image.";
    }
  } catch (error) {
    console.error(error);
    return "An error occurred while generating the image.";
  }
};

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  for (const component of imageComponents) {
    component.content = await generateImageUrl(
      component.alt || "Placeholder Image"
    );
  }
};

export const generateLayoutJson = async (outlineArray: string[]) => {
  const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

Use these outlines as a starting point for the content of the presentations 
  ${JSON.stringify(outlineArray)}

The output must be an array of JSON objects.
  1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
  2. Ensuring each layout is unique.
  3. Adhere to the structure of existing layouts
  4. Fill placeholder data into content fields where required.
  5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  6. Ensure proper formatting and schema alignment for the output JSON.
7. First create LAYOUTS TYPES  at the top most level of the JSON output as follows ${JSON.stringify(
    [
      {
        slideName: "Blank card",
        type: "blank-card",
        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
        content: {},
      },
    ]
  )}

8.The content property of each LAYOUTS TYPE should start with "column" and within the columns content property you can use any  of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string.Here is an example of what 1 layout with 1 column with 1 title inside would look like:
${JSON.stringify([
  {
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: v4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: v4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },
])}


9. Here is a final example of an example output for you to get an idea 
${JSON.stringify([
  {
    id: v4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: v4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: v4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },

  {
    id: v4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: v4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: v4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: v4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
            {
              id: v4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: v4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: v4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },
])}

 For Images 
  - The alt text should describe the image clearly and concisely.
  - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
  - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
  - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

  Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
`;
  const MODEL_NAME = "gemini-1.5-pro";
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!API_KEY) {
    return { status: 500, error: "GOOGLE_API_KEY is not set." };
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 5000,
  };

  const parts = [{ text: prompt }];
  const contents = [{ role: "user", parts }]; // Added the role
  // console.log("working");
  try {
    const result = await model.generateContent({
      contents,
      generationConfig,
    });
    const response = result.response;
    console.log(response);
    const text =
      response.candidates && response.candidates.length > 0
        ? response.candidates[0].content.parts[0].text
        : undefined;

    if (!text) {
      return { status: 400, error: "No Content generated" };
    }
    if (text) {
      try {
        // console.log(text);
        const jsonResponse = JSON.parse(text.replace(/```json|```/g, ""));
        await Promise.all(jsonResponse.map(replaceImagePlaceholders));

        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return { status: 500, error: "Internal Server Error - JSON Parsing" };
      }
    }
    return { status: 400, error: "No Content generated" };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: "Project ID is required" };
    }
    const user = await currentUser();
    if (!user) {
      return { status: 401, error: "User not authenticated" };
    }
    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!userExist || !userExist.subscription) {
      return {
        status: 404,
        error: !userExist?.subscription
          ? "User does not have an active subscription"
          : "User not found",
      };
    }
    const project = await client.project.findUnique({
      where: {
        id: projectId,
        isDeleted: false,
      },
    });
    if (!project) {
      return { status: 404, error: "Project not found" };
    }
    if (!project.outlines || project.outlines.length === 0) {
      return { status: 400, error: "Project has no outlines" };
    }
    const layouts = await generateLayoutJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }
    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data, themeName: theme },
    });
    return { status: 200, data: layouts.data };
  } catch (error) {
    console.log(error);

    return { status: 500, error: "Internal Server Error" };
  }
};
