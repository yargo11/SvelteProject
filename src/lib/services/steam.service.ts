import type {
  FriendListResponse,
  OwnedGamesResponse,
  PlayerSummaryResponse,
  RecentlyPlayedGamesResponse,
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
  try {
    const data = await fetchSteam<SteamNewsResponse>(
      `ISteamNews/GetNewsForApp/v0002/?appid=${appId}&count=${count}&maxlength=${maxLength}&format=json`,
    );

    return data.appnews?.newsitems ?? [];
  } catch (error) {
    console.error("Error fetching Steam news:", error);
    return [];
  }
}

export async function getPlayerSummaries(steamId: string) {
  try {
    const data = await fetchSteam<PlayerSummaryResponse>(
      `ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`,
    );

    return data.response?.players ?? [];
  } catch (error) {
    console.error("Error fetching Steam player summaries:", error);
    return [];
  }
}

export async function getOwnedGames(steamId: string) {
  try {
    const data = await fetchSteam<OwnedGamesResponse>(
      `IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamId}&include_appinfo=true&format=json`,
    );
    return data.response?.games ?? [];
  } catch (error) {
    console.error("Error fetching Steam owned games:", error);
    return [];
  }
}

export async function getRecentlyPlayedGames(steamId: string) {
  try {
    const data = await fetchSteam<RecentlyPlayedGamesResponse>(
      `IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamId}&format=json`,
    );
    return data.response?.games ?? [];
  } catch (error) {
    console.error("Error fetching Steam recently played games:", error);
    return [];
  }
}

export async function getFriendList(steamId: string) {
  try {
    const data = await fetchSteam<FriendListResponse>(
      `ISteamUser/GetFriendList/v0001/?key=${key}&steamid=${steamId}&relationship=friend&format=json`,
    );
    return data.friendslist?.friends ?? [];
  } catch (error) {
    console.error("Error fetching Steam friend list:", error);
    return [];
  }
}
