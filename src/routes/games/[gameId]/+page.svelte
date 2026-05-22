<script lang="ts">
  import MyButton from "$lib/MyButton.svelte";
  import type { PageData } from "./$types";
  import { games, toggleFavorite } from "../../../stores/games";

  let { data }: { data: PageData } = $props();

  let loading = $state(true);

  let isFavorite = $derived(
    $games.find((g) => g.id === data.gameDetails?.id)?.favorite ?? false,
  );

  function toogleFavoriteGame(id: number) {
    toggleFavorite(id);
  }

  $effect(() => {
    const timeout = setTimeout(() => {
      loading = false;
    }, 2000);

    return () => clearTimeout(timeout);
  });
</script>

{#if !loading}
  <h1 class="text-3xl">{data.gameDetails?.name}</h1>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-lg bg-surface text-primary w-fit">
      <img
        src={data.gameDetails?.cover}
        alt={data.gameDetails?.name}
        class="rounded-t-lg"
      />
      <div class="p-4">
        <p class="text-lg">
          {data.gameDetails?.name} - {data.gameDetails?.studio}
          {isFavorite ? "❤️" : "♡"}
        </p>
        <button onclick={() => toogleFavoriteGame(data.gameDetails?.id || 0)}
          >Favorite</button
        >
        <!-- <MyButton toggleFavorite={data.gameDetails?.favorite} /> -->
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
