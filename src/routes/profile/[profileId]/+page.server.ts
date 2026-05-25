import { sortedGames } from "$lib/utils/games";
import { getOwnedGames, getPlayerSummaries } from "$lib/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const steamId = params.profileId;

  try {
    const [playerSummary, ownedGames] = await Promise.all([
      getPlayerSummaries(steamId),
      getOwnedGames(steamId),
    ]);

    const sortedGamesList = sortedGames(ownedGames);

    return { playerSummary, sortedGamesList, error: null };
  } catch {
    return {
      playerSummary: [],
      sortedGamesList: [],
      error: "Não foi possível carregar o perfil do jogador.",
    };
  }
};
