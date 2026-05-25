<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import EmptyState from "$lib/components/ui/EmptyState.svelte";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let customSteamId: string = $state("");
  let loading = $state(false);
  const url_img =
    "https://media.steampowered.com/steamcommunity/public/images/apps/";

  const player = $derived(data.playerSummary[0] ?? null);

  function searchById() {
    if (customSteamId.trim()) {
      goto(`/profile/${customSteamId.trim()}`);
    }
  }

  async function retry() {
    loading = true;
    await invalidateAll();
    loading = false;
  }
</script>

<div class="flex flex-col gap-4 w-full">
  <div class="flex gap-2">
    <input
      bind:value={customSteamId}
      placeholder="Digite seu SteamID"
      class="flex-1 p-2 border rounded bg-surface"
    />
    <button
      onclick={searchById}
      class="px-4 py-2 bg-primary text-background rounded font-semibold hover:opacity-90"
    >
      Procurar por ID
    </button>
  </div>

  {#if loading}
    <LoadingSpinner />
  {:else if data.error}
    <ErrorState message={data.error} onRetry={retry} />
  {:else if !player}
    <EmptyState
      message="Perfil não encontrado. Verifique o SteamID."
      icon="👤"
    />
  {:else}
    <div class="flex flex-col gap-3 p-6 bg-surface rounded-xl">
      <img
        src={player.avatarfull}
        alt={player.personaname}
        width="100"
        height="auto"
        class="rounded-lg"
      />
      <div class="flex flex-row gap-3">
        <h2 class="text-xl font-bold">{player.personaname}</h2>
        <a href={player.profileurl} target="_blank">🕹️</a>
      </div>
      <p>
        Ultima vez online: {new Date(player.lastlogoff * 1000).toLocaleString()}
      </p>
      <p>
        Ingressou em: {new Date(player.timecreated * 1000).toLocaleString()}
      </p>
    </div>

    {#if data.sortedGamesList.length === 0}
      <EmptyState
        message="Nenhum jogo encontrado na biblioteca deste perfil."
        icon="🎮"
      />
    {:else}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each data.sortedGamesList as game}
          <div
            class="flex flex-row items-center gap-2 p-4 border border-border rounded bg-surface"
          >
            <img
              src={`${url_img}${game.appid}/${game.img_icon_url}.jpg`}
              alt={game.name}
              class="w-12 h-12 object-cover rounded"
            />
            <div class="flex flex-col">
              <p class="text-lg">{game.name}</p>
              <p>
                Ultima vez jogado em: {new Date(
                  game.rtime_last_played * 1000,
                ).toLocaleDateString("pt-BR")}
              </p>
              <p>
                Tempo total jogado: {game.playtime_forever > 60
                  ? Math.floor(game.playtime_forever / 60) + " horas"
                  : game.playtime_forever + " minutos"}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
