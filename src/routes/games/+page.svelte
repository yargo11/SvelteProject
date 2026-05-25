<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import EmptyState from "$lib/components/ui/EmptyState.svelte";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
  import { GAME_COVER } from "$lib/endpoints";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let gameFilter = $state("");
  let loading = $state(false);

  const filteredGames = $derived(
    data.sortedGamesList.filter((g) =>
      g.name.toLowerCase().includes(gameFilter.toLowerCase()),
    ),
  );

  async function retry() {
    loading = true;
    await invalidateAll();
    loading = false;
  }
</script>

<div>
  <div class="w-full mb-4">
    <input
      class="bg-surface border border-border rounded-lg w-full h-10 px-4 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
      placeholder="🔍 Pesquisar jogo..."
      bind:value={gameFilter}
    />
  </div>

  {#if loading}
    <LoadingSpinner />
  {:else if data.error}
    <ErrorState message={data.error} onRetry={retry} />
  {:else if data.sortedGamesList.length === 0}
    <EmptyState message="Nenhum jogo encontrado na sua biblioteca." icon="🎮" />
  {:else if filteredGames.length === 0}
    <EmptyState message="Nenhum jogo corresponde à pesquisa." icon="🔍" />
  {:else}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {#each filteredGames as game}
        <a href="/games/{game.appid}">
          <div
            class="rounded-lg bg-surface border border-border text-foreground w-fit hover:border-primary/40 transition-colors"
          >
            <img
              src={`${GAME_COVER}${game.appid}/header.jpg`}
              alt={game.name}
              class="rounded-t-lg"
            />
            <div class="p-4">
              <p class="text-sm font-semibold text-foreground">
                {game.name.slice(0, 30)}{game.name.length > 30 ? "..." : ""}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
