<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import EmptyState from "$lib/components/ui/EmptyState.svelte";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
  import NewsCard from "$lib/NewsCard.svelte";
  import type { PageData } from "./$types";

  const THE_FINALS_COVER =
    "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2073850/699da40c69cc8b1b3f86c89a6a925b04535672da/header.jpg?t=1778695694";

  let { data }: { data: PageData } = $props();
  let loading = $state(false);

  async function retry() {
    loading = true;
    await invalidateAll();
    loading = false;
  }
</script>

<div class="flex flex-col gap-3 p-6 w-full">
  {#if loading}
    <LoadingSpinner />
  {:else if data.error}
    <ErrorState message={data.error} onRetry={retry} />
  {:else if data.gameNews.length === 0}
    <EmptyState message="Nenhuma notícia encontrada para este jogo." icon="📰" />
  {:else}
    {#each data.gameNews as news (news.gid)}
      <NewsCard
        {news}
        thumbnail={news.appid === 2073850 ? THE_FINALS_COVER : undefined}
      />
    {/each}
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
