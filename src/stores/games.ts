import { writable } from "svelte/store";
import { gameList } from "./temporaryGameData";

export const games = writable([...gameList]);

export function toggleFavorite(id: number) {
  games.update((list) => {
    const game = list.find((g) => g.id === id);
    if (game) {
      game.favorite = !game.favorite;
    }
    return list;
  });
}
