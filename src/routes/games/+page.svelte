<script lang="ts">
  import type { PageProps } from "./$types";
  import { games } from "../../stores/games";

  let { data }: PageProps = $props();

  let gameFilter = $state("");

  let loading = $state(true);

  $effect(() => {
    const timeout = setTimeout(() => {
      loading = false;
    }, 1000);

    return () => clearTimeout(timeout);
  });
</script>

<div>
  <div class="w-full mb-4">
    <input
      class="bg-foreground rounded-lg w-full h-10 px-4"
      placeholder="🔍 Pesquisar jogo..."
      bind:value={gameFilter}
    />
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#if !loading}
      {#each $games as game}
        {#if game.name.toLowerCase().includes(gameFilter.toLowerCase())}
          <a href="/games/{game.id}">
            <div class="rounded-lg bg-surface text-primary w-fit">
              <img src={game.cover} alt={game.name} class="rounded-t-lg" />
              <div class="p-4">
                <p class="text-lg">
                  {game.name} - {game.studio}
                  {game.favorite ? "❤️" : "♡"}
                </p>
              </div>
            </div>
          </a>
        {/if}
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</div>
