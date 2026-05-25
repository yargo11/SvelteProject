import type { OwnedGame } from "$lib/types";

export function sortedGames(ownedGames: OwnedGame[]) {
  return ownedGames
    .filter((game) => game.rtime_last_played && game.rtime_last_played > 0)
    .sort((a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0));
}

export function minutesToHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}
