import {
  getOwnedGames,
  getPlayerSummaries,
} from "../../../lib/services/steam.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const steamId = params.profileId;

  try {
    const [playerSummary, ownedGames] = await Promise.all([
      getPlayerSummaries(steamId),
      getOwnedGames(steamId),
    ]);

    const sortedGames = ownedGames
      .filter((game) => game.rtime_last_played && game.rtime_last_played > 0)
      .sort((a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0));

    return { playerSummary, ownedGames: sortedGames, error: null };
  } catch {
    return {
      playerSummary: [],
      ownedGames: [],
      error: "Não foi possível carregar o perfil do jogador.",
    };
  }
};
