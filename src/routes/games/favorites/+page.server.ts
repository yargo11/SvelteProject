import { gameList } from "../../../stores/temporaryGameData";

export function load() {
  return {
    game: gameList.map((game) => ({
      id: game.id,
      name: game.name,
      favorite: game.favorite,
      studio: game.studio,
      cover: game.cover,
    })),
  };
}
