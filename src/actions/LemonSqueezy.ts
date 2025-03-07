"use server";

import { lemonSqueezyClient } from "@/lib/axios";

export const buySubcription = async (buyUserId: string) => {
  try {
    const res = await lemonSqueezyClient(
      process.env.NEXT_PUBLIC_LPNON_SQUEEZY_API_KEY
    ).post("/checkouts", {
      data: {
        type: "checkout",
        attributes: {
          checkout_data: {
            custom: {
              buyerUserId: buyUserId,
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.NEXT_PUBLIC_LPNON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.NEXT_PUBLIC_LPNON_SQUEEZY_VARIANT_ID,
            },
          },
        },
      },
    });
    const checkoutUrl = res.data.data.attributes.url;
    return { url: checkoutUrl, status: 200 };
  } catch (error) {
    console.error(error);
    return { message: " Internal Server Error", status: 500 };
  }
};
