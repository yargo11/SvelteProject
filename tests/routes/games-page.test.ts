// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import GamesPage from "../../src/routes/games/+page.svelte";
import type { PageData, PageProps } from "../../src/routes/games/$types";

vi.mock("$app/navigation", () => ({
  invalidateAll: vi.fn().mockResolvedValue(undefined),
}));

const ownedGames = [
  {
    appid: 1808500,
    name: "Arc Raiders",
    playtime_forever: 320,
    rtime_last_played: 1710000000,
    img_icon_url: "",
    has_community_visible_stats: true,
    playtime_windows_forever: 320,
    playtime_mac_forever: 0,
    playtime_linux_forever: 0,
    playtime_deck_forever: 0,
    playtime_disconnected: 0,
    content_descriptorids: [],
  },
  {
    appid: 2073850,
    name: "The Finals",
    playtime_forever: 640,
    rtime_last_played: 1710001000,
    img_icon_url: "",
    has_community_visible_stats: true,
    playtime_windows_forever: 640,
    playtime_mac_forever: 0,
    playtime_linux_forever: 0,
    playtime_deck_forever: 0,
    playtime_disconnected: 0,
    content_descriptorids: [],
  },
];

function renderGamesPage(data: PageData = { ownedGames, error: null }) {
  const props: PageProps = {
    data,
    form: null,
    params: {},
  };

  return render(GamesPage, {
    props,
  });
}

describe("/games page", () => {
  it("renders the owned games list", () => {
    renderGamesPage();

    expect(screen.getByText("Arc Raiders")).toBeInTheDocument();
    expect(screen.getByText("The Finals")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /arc raiders/i })).toHaveAttribute(
      "href",
      "/games/1808500",
    );
  });

  it("filters games by the search input", async () => {
    renderGamesPage();

    await fireEvent.input(screen.getByPlaceholderText(/pesquisar jogo/i), {
      target: { value: "finals" },
    });

    expect(screen.queryByText("Arc Raiders")).not.toBeInTheDocument();
    expect(screen.getByText("The Finals")).toBeInTheDocument();
  });

  it("shows an empty state when the library is empty", () => {
    renderGamesPage({ ownedGames: [], error: null });

    expect(
      screen.getByText("Nenhum jogo encontrado na sua biblioteca."),
    ).toBeInTheDocument();
  });

  it("shows an empty state when the search has no matches", async () => {
    renderGamesPage();

    await fireEvent.input(screen.getByPlaceholderText(/pesquisar jogo/i), {
      target: { value: "portal" },
    });

    expect(screen.getByText(/Nenhum jogo corresponde/)).toBeInTheDocument();
  });

  it("shows an error state with a retry button", () => {
    renderGamesPage({
      ownedGames: [],
      error: "Nao foi possivel carregar seus jogos.",
    });

    expect(
      screen.getByText("Nao foi possivel carregar seus jogos."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tentar novamente/i })).toBeInTheDocument();
  });
});
