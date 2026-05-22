import {
  getOwnedGames,
  getPlayerSummaries,
} from "../../../lib/services/steam.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const steamId = params.profileId;

  const playerSummary = await getPlayerSummaries(steamId);

  const ownedGames = await getOwnedGames(steamId);
  const sortedGames = ownedGames
    .filter((game) => game.rtime_last_played && game.rtime_last_played > 0)
    .sort((a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0));

  return { playerSummary, ownedGames: sortedGames };
};
