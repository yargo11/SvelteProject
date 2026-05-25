import { MY_STEAM_ID } from "$env/static/private";
import { sortedGames } from "$lib/utils/games";
import { getOwnedGames } from "$lib/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const ownedGames = await getOwnedGames(MY_STEAM_ID);
    const sortedGamesList = sortedGames(ownedGames);
    return { sortedGamesList, error: null };
  } catch {
    return {
      sortedGamesList: [],
      error: "Não foi possível carregar seus jogos.",
    };
  }
};
