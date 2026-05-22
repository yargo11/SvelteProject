<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let customSteamId: string = $state("");
  const url_img =
    "https://media.steampowered.com/steamcommunity/public/images/apps/";

  function searchById() {
    if (customSteamId.trim()) {
      goto(`/profile/${customSteamId.trim()}`);
    }
  }
</script>

<input
  bind:value={customSteamId}
  placeholder="Digite seu SteamID"
  class="mb-4 p-2 border rounded w-full"
/>
<button onclick={searchById}>Procurar por ID</button>

<div class="flex flex-col gap-3 p-6 w-full">
  <img
    src={data.playerSummary[0].avatarfull}
    alt={data.playerSummary[0].personaname}
    width={"100px"}
    height={"auto"}
  />
  <div class="flex flex-row gap-3">
    <h2 class="text-xl font-bold">{data.playerSummary[0].personaname}</h2>
    <a href={data.playerSummary[0].profileurl} target="_blank">🕹️</a>
  </div>
  <p>
    Ultima vez online: {new Date(
      data.playerSummary[0].lastlogoff * 1000,
    ).toLocaleString()}
  </p>
  <p>
    Ingressou em: {new Date(
      data.playerSummary[0].timecreated * 1000,
    ).toLocaleString()}
  </p>
</div>
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#each data.ownedGames as game}
    <div class="flex flex-row items-center gap-2 p-4 border rounded">
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

<style lang="postcss">
  @reference "tailwindcss";
</style>
