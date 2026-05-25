import { getSteamNews } from "$lib/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const gameNews = await getSteamNews(2073850, 3, 300);
    return { gameNews, error: null };
  } catch {
    return { gameNews: [], error: "Não foi possível carregar as notícias." };
  }
};
