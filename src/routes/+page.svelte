<script lang="ts">
  import type { PageData } from "./$types";
  import NewsCard from "$lib/NewsCard.svelte";

  const THE_FINALS_COVER =
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2073850/699da40c69cc8b1b3f86c89a6a925b04535672da/header.jpg?t=1778695694";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-3 p-6 w-full">
  {#each data.gameNews as news (news.gid)}
    <NewsCard
      {news}
      thumbnail={news.appid === 2073850 ? THE_FINALS_COVER : undefined}
    />
  {/each}
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
