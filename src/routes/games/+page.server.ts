import { MY_STEAM_ID } from "$env/static/private";
import { getOwnedGames } from "../../lib/services/steam.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const ownedGames = await getOwnedGames(MY_STEAM_ID);
    const sortedGames = ownedGames
      .filter((game) => game.rtime_last_played && game.rtime_last_played > 0)
      .sort((a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0));
    return { ownedGames: sortedGames, error: null };
  } catch {
    return { ownedGames: [], error: "Não foi possível carregar seus jogos." };
  }
};
