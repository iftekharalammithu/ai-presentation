import { client } from "@/lib/prisma";
import { NextRequest } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

// THis need to config into the LemonSqueezy API ex: https://website.com/api/webhook/subscription Like this

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const { buyerUserId } = body.meta.custom_data;
    if (!buyerUserId) {
      throw new Error("Invalid buyerUserId or Id Does't Exist");
    }
    const hmac = crypto.createHmac(
      "sha256",
      process.env.NEXT_PUBLIC_LPNONSQUEEZY_WEBHOOK_SECRET!
    );

    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");
    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature");
    }

    const buyer = await client.user.update({
      where: {
        id: buyerUserId,
      },
      data: {
        subscription: true,
      },
    });
    if (!buyer) {
      return Response.json({
        status: 404,
        message: "User not found",
      });
    }
    return Response.json({ status: 200, data: buyer });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
