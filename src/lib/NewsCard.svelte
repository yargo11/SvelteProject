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
  class="flex gap-4 rounded-lg w-full bg-surface border border-border overflow-hidden hover:bg-surface-alt hover:border-primary/40 transition-colors"
>
  {#if thumbnail}
    <img
      src={thumbnail}
      alt={news.title}
      class="w-fit h-28 object-cover shrink-0"
    />
  {:else}
    <div class="w-fit h-28 bg-background shrink-0"></div>
  {/if}

  <div class="flex flex-col justify-center gap-1 py-3 pr-4">
    <h2 class="text-foreground font-bold text-base leading-snug">{news.title}</h2>
    <p class="text-accent text-xs uppercase tracking-wide font-semibold">
      Atualização &nbsp;{formatDate(news.date)}
    </p>
    <p class="text-muted text-sm line-clamp-2">
      {stripMarkup(news.contents)}
    </p>
  </div>
</a>
