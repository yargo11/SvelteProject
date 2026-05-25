import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getGameDetails,
  getOwnedGames,
  getPlayerAchievements,
  getPlayerSummaries,
  getSteamNews,
} from "$lib/services";

function mockJsonResponse(
  body: unknown,
  init: { ok?: boolean; status?: number } = {},
) {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe("steam.service", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("returns Steam news items", async () => {
    const newsItem = {
      gid: "news-1",
      title: "Patch notes",
      url: "https://example.com/news",
      is_external_url: true,
      author: "Steam",
      contents: "Small fixes",
      feedlabel: "Steam News",
      date: 1710000000,
      feedname: "steam",
      feed_type: 1,
      appid: 2073850,
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        mockJsonResponse({ appnews: { newsitems: [newsItem] } }),
      );

    await expect(getSteamNews(2073850, 1, 120)).resolves.toEqual([newsItem]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "ISteamNews/GetNewsForApp/v0002/?appid=2073850&count=1&maxlength=120&format=json",
      ),
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("returns owned games with app info", async () => {
    const ownedGame = {
      appid: 1808500,
      name: "Arc Raiders",
      playtime_forever: 120,
      img_icon_url: "icon",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse({ response: { games: [ownedGame] } }),
    );

    await expect(getOwnedGames("76561198000000000")).resolves.toEqual([
      ownedGame,
    ]);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("include_appinfo=true"),
      expect.any(Object),
    );
  });

  it("throws a SteamApiError when Steam returns a non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse({ error: "Forbidden" }, { ok: false, status: 403 }),
    );

    await expect(getPlayerSummaries("76561198000000000")).rejects.toThrow(
      "Steam API error 403",
    );
  });

  it("aborts slow Steam API requests", async () => {
    vi.useFakeTimers();

    vi.spyOn(globalThis, "fetch").mockImplementation((_, init) => {
      const signal = init?.signal;

      return new Promise<Response>((_, reject) => {
        signal?.addEventListener("abort", () => {
          reject(new Error("timeout"));
        });
      });
    });

    const request = expect(getSteamNews(2073850)).rejects.toThrow("timeout");
    await vi.advanceTimersByTimeAsync(8000);

    await request;
  });

  it("returns app details from the Steam store API", async () => {
    const appDetails = {
      success: true,
      data: {
        name: "The Finals",
      },
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(mockJsonResponse({ 2073850: appDetails }));

    await expect(getGameDetails(2073850)).resolves.toEqual(appDetails);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://store.steampowered.com/api/appdetails?appids=2073850",
      { cache: "no-store" },
    );
  });

  it("returns null when app has no achievements stats", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse({
        playerstats: {
          error: "Requested app has no stats",
          success: false,
        },
      }),
    );

    await expect(
      getPlayerAchievements("76561198057548002", 1962700),
    ).resolves.toBeNull();
  });
});
