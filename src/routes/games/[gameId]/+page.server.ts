import { gameList } from "../../../stores/temporaryGameData";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const gameDetails = gameList.find(
    (game) => game.id === Number(params.gameId),
  );

  return { gameDetails };
};
