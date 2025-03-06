import axios from "axios";

export const lemonSqueezyClient = (lemonSqueezyApiKey?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_LPNON_SQUEEZY_API,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${
        lemonSqueezyApiKey
          ? lemonSqueezyApiKey
          : process.env.NEXT_PUBLIC_LPNON_SQUEEZY_API_KEY
      }`,
    },
  });
};
