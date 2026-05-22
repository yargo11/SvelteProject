<script lang="ts">
  import type { SteamNewsResponse } from "./types";

  let {
    news,
    thumbnail,
  }: {
    news: SteamNewsResponse["appnews"]["newsitems"][number];
    thumbnail?: string;
  } = $props();

  function stripMarkup(contents: string): string {
    return contents
      .replace(/\[img\][^\[]*\[\/img\]/gi, "")
      .replace(/\{STEAM_CLAN_IMAGE\}[^\s\]]*/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[[^\]]+\]/g, "")
      .trim();
  }

  function formatDate(unix: number): string {
    return new Date(unix * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
    });
  }
</script>

<a
  href={news.url}
  target="_blank"
  rel="noopener noreferrer"
  class="flex gap-4 rounded w-full bg-[#1b2838] p-0 overflow-hidden hover:bg-[#2a3f5f] transition-colors"
>
  {#if thumbnail}
    <img
      src={thumbnail}
      alt={news.title}
      class="w-fit h-28 object-cover shrink-0"
    />
  {:else}
    <div class="w-fit h-28 bg-[#0e1923] shrink-0"></div>
  {/if}

  <div class="flex flex-col justify-center gap-1 py-3 pr-4">
    <h2 class="text-white font-bold text-base leading-snug">{news.title}</h2>
    <p class="text-[#67c1f5] text-xs uppercase tracking-wide">
      Atualização &nbsp;{formatDate(news.date)}
    </p>
    <p class="text-[#8f98a0] text-sm line-clamp-2">
      {stripMarkup(news.contents)}
    </p>
  </div>
</a>
