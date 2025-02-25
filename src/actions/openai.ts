import { GoogleGenerativeAI } from "@google/generative-ai";

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
