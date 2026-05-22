<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let loading = $state(true);

  $effect(() => {
    const timeout = setTimeout(() => {
      loading = false;
    }, 2000);

    return () => clearTimeout(timeout);
  });
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#if !loading}
    {#each data.game as game}
      {#if game.favorite}
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
