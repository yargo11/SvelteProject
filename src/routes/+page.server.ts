import { getSteamNews } from "../lib/services/steam.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const gameNews = await getSteamNews(2073850, 3, 300);
  return { gameNews };
};
