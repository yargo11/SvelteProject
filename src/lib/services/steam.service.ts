import type {
  FriendListResponse,
  OwnedGamesResponse,
  PlayerAchievementsResponse,
  PlayerSummaryResponse,
  RecentlyPlayedGamesResponse,
  SteamAppDetailResponse,
  SteamNewsResponse,
} from "$lib/types";

import { STEAM_API_KEY } from "$env/static/private";
const key = STEAM_API_KEY;
const STEAM_API_BASE_URL = "https://api.steampowered.com/";

class SteamApiError extends Error {
  constructor(
    public status: number,
    public endpoint: string,
  ) {
    super(`Steam API error ${status} on ${endpoint}`);
    this.name = "SteamApiError";
  }
}

async function fetchSteam<T>(endpoint: string, timeoutMs = 8000): Promise<T> {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort("timeout"),
    timeoutMs,
  );

  const signal = AbortSignal.any([timeoutController.signal]);

  try {
    const response = await fetch(`${STEAM_API_BASE_URL}${endpoint}`, {
      signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new SteamApiError(response.status, endpoint);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getSteamNews(
  appId: number,
  count: number = 3,
  maxLength: number = 300,
) {
  const data = await fetchSteam<SteamNewsResponse>(
    `ISteamNews/GetNewsForApp/v0002/?appid=${appId}&count=${count}&maxlength=${maxLength}&format=json`,
  );
  return data.appnews?.newsitems ?? [];
}

export async function getPlayerSummaries(steamId: string) {
  const data = await fetchSteam<PlayerSummaryResponse>(
    `ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`,
  );
  return data.response?.players ?? [];
}

export async function getOwnedGames(steamId: string) {
  const data = await fetchSteam<OwnedGamesResponse>(
    `IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamId}&include_appinfo=true&format=json`,
  );
  return data.response?.games ?? [];
}

export async function getRecentlyPlayedGames(steamId: string) {
  const data = await fetchSteam<RecentlyPlayedGamesResponse>(
    `IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamId}&format=json`,
  );
  return data.response?.games ?? [];
}

export async function getFriendList(steamId: string) {
  const data = await fetchSteam<FriendListResponse>(
    `ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${steamId}&relationship=friend&format=json`,
  );
  return data.friendslist?.friends ?? [];
}

export async function getGameDetails(
  appId: number,
): Promise<SteamAppDetailResponse | null> {
  const response = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${appId}`,
    { cache: "no-store" },
  );
  if (!response.ok) throw new SteamApiError(response.status, `appdetails?appids=${appId}`);
  const data = (await response.json()) as Record<number, SteamAppDetailResponse>;
  return data[appId] ?? null;
}

export async function getPlayerAchievements(steamId: string, appId: number) {
  const data = await fetchSteam<PlayerAchievementsResponse>(
    `ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${key}&steamid=${steamId}`,
  );
  return data.playerstats ?? null;
}
