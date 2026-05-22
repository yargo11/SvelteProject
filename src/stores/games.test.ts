import { beforeEach, describe, expect, it } from "vitest";
import { get } from "svelte/store";
import { games, toggleFavorite } from "./games";
import { gameList } from "./temporaryGameData";

function resetGames() {
  games.set(structuredClone(gameList));
}

describe("games store", () => {
  beforeEach(() => {
    resetGames();
  });

  it("starts with the temporary game list", () => {
    expect(get(games)).toEqual(gameList);
  });

  it("toggles a favorite game off", () => {
    toggleFavorite(1808500);

    const arcRaiders = get(games).find((game) => game.id === 1808500);
    expect(arcRaiders?.favorite).toBe(false);
  });

  it("toggles a non-favorite game on", () => {
    toggleFavorite(440900);

    const conanExiles = get(games).find((game) => game.id === 440900);
    expect(conanExiles?.favorite).toBe(true);
  });

  it("keeps the list unchanged when the game id does not exist", () => {
    const before = structuredClone(get(games));

    toggleFavorite(999999);

    expect(get(games)).toEqual(before);
  });
});
