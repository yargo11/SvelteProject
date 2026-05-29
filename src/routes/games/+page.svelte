<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import CustomInput from "$lib/components/ui/CustomInput.svelte";
  import EmptyState from "$lib/components/ui/EmptyState.svelte";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import GameCard from "$lib/components/ui/GameCard.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
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
    <CustomInput placeholder="Pesquisar jogo..." bind:value={gameFilter} />
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
        <GameCard data={{ game }} />
      {/each}
    </div>
  {/if}
</div>
