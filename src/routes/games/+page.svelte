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
    data.ownedGames.filter((g) =>
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
      class="bg-foreground rounded-lg w-full h-10 px-4"
      placeholder="🔍 Pesquisar jogo..."
      bind:value={gameFilter}
    />
  </div>

  {#if loading}
    <LoadingSpinner />
  {:else if data.error}
    <ErrorState message={data.error} onRetry={retry} />
  {:else if data.ownedGames.length === 0}
    <EmptyState message="Nenhum jogo encontrado na sua biblioteca." icon="🎮" />
  {:else if filteredGames.length === 0}
    <EmptyState message="Nenhum jogo corresponde à pesquisa." icon="🔍" />
  {:else}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {#each filteredGames as game}
        <a href="/games/{game.appid}">
          <div class="rounded-lg bg-surface text-primary w-fit">
            <img
              src={`${GAME_COVER}${game.appid}/header.jpg`}
              alt={game.name}
              class="rounded-t-lg"
            />
            <div class="p-4">
              <p class="text-md font-semibold">
                {game.name.slice(0, 30)}{game.name.length > 30 ? "..." : ""}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
