import { MY_STEAM_ID } from "$env/static/private";
import {
  getGameDetails,
  getOwnedGames,
  getPlayerAchievements,
  getRecentlyPlayedGames,
} from "../../../lib/services/steam.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const gameId = Number(params.gameId);

  const [gameDetails, ownedGames, recentGames, playerStats] = await Promise.all(
    [
      getGameDetails(gameId),
      getOwnedGames(MY_STEAM_ID),
      getRecentlyPlayedGames(MY_STEAM_ID),
      getPlayerAchievements(MY_STEAM_ID, gameId),
    ],
  );

  const ownedGame = ownedGames.find((g) => g.appid === gameId) ?? null;
  const recentGame = recentGames.find((g) => g.appid === gameId) ?? null;

  return { gameDetails, ownedGame, recentGame, playerStats };
};
