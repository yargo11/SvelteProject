<script lang="ts">
  import { GAME_COVER } from "$lib/endpoints";
  import type { PageProps } from "./$types";

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
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
    {#if !loading}
      {#each data.ownedGames as game}
        {#if game.name.toLowerCase().includes(gameFilter.toLowerCase())}
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
        {/if}
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</div>
