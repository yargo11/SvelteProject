<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const game = $derived(data.gameDetails?.data);
  const owned = $derived(data.ownedGame);
  const recent = $derived(data.recentGame);
  const playerStats = $derived(data.playerStats);

  const unlockedAchievements = $derived(
    playerStats?.achievements.filter((a) => a.achieved === 1) ?? [],
  );
  const totalAchievements = $derived(playerStats?.achievements.length ?? 0);

  const platformIcons: Record<string, string> = {
    windows: "🪟",
    mac: "🍎",
    linux: "🐧",
  };

  function minutesToHours(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  }

  function formatTimestamp(unix: number): string {
    return new Date(unix * 1000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
</script>

{#if game}
  <!-- Hero -->
  <div
    class="relative w-full h-72 bg-cover bg-center rounded-xl overflow-hidden mb-8"
    style={`background-image: url('${game.background_raw}')`}
  >
    <div class="absolute inset-0 bg-black/60 flex items-end p-6 gap-4">
      <img
        src={game.header_image}
        alt={game.name}
        class="h-20 rounded-lg shadow-lg"
      />
      <div>
        <h1 class="text-3xl font-bold text-white">{game.name}</h1>
        <p class="text-sm text-gray-300 mt-1">
          {game.developers.join(", ")} &bull; {game.release_date.date}
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-8">
    <!-- User stats -->
    {#if owned}
      <div class="bg-surface rounded-xl p-6">
        <h2 class="text-base font-bold mb-4">Suas Estatísticas</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p class="text-2xl font-bold text-primary">
              {minutesToHours(owned.playtime_forever)}
            </p>
            <p class="text-xs text-foreground/50 mt-1">Tempo total</p>
          </div>
          {#if recent}
            <div>
              <p class="text-2xl font-bold text-primary">
                {minutesToHours(recent.playtime_2weeks)}
              </p>
              <p class="text-xs text-foreground/50 mt-1">Últimas 2 semanas</p>
            </div>
          {/if}
          <div>
            <p class="text-2xl font-bold text-primary">
              {minutesToHours(owned.playtime_windows_forever)}
            </p>
            <p class="text-xs text-foreground/50 mt-1">No Windows</p>
          </div>
          {#if owned.rtime_last_played}
            <div>
              <p class="text-lg font-bold text-primary">
                {formatTimestamp(owned.rtime_last_played)}
              </p>
              <p class="text-xs text-foreground/50 mt-1">Última vez jogado</p>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Summary row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Description + tags -->
      <div class="md:col-span-2 bg-surface rounded-xl p-6 flex flex-col gap-4">
        <p class="text-base leading-relaxed">{game.short_description}</p>

        <div class="flex flex-wrap gap-2">
          {#each game.genres as genre}
            <span
              class="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold"
            >
              {genre.description}
            </span>
          {/each}
          {#each game.categories.slice(0, 5) as cat}
            <span class="px-3 py-1 rounded-full bg-foreground/10 text-xs">
              {cat.description}
            </span>
          {/each}
        </div>
      </div>

      <!-- Info card -->
      <div class="bg-surface rounded-xl p-6 flex flex-col gap-3 text-sm">
        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Preço
          </p>
          {#if game.is_free}
            <p class="text-primary font-bold text-lg">Gratuito</p>
          {:else}
            <p class="font-bold text-lg">
              {game.price_overview?.final_formatted ?? "—"}
            </p>
          {/if}
        </div>

        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Desenvolvedor
          </p>
          <p>{game.developers.join(", ")}</p>
        </div>

        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Publicador
          </p>
          <p>{game.publishers.join(", ")}</p>
        </div>

        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Plataformas
          </p>
          <div class="flex gap-2 text-base">
            {#each Object.entries(game.platforms) as [platform, supported]}
              {#if supported}
                <span title={platform}>{platformIcons[platform]}</span>
              {/if}
            {/each}
          </div>
        </div>

        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Recomendações
          </p>
          <p>👍 {game.recommendations.total.toLocaleString()}</p>
        </div>

        <div>
          <p class="text-foreground/50 text-xs uppercase font-semibold mb-1">
            Conquistas
          </p>
          <p>🏆 {game.achievements.total}</p>
        </div>

        {#if game.website}
          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto text-center bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 transition-opacity"
          >
            Site Oficial
          </a>
        {/if}
      </div>
    </div>

    <!-- Screenshots -->
    {#if game.screenshots.length > 0}
      <div>
        <h2 class="text-xl font-bold mb-3">Screenshots</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          {#each game.screenshots.slice(0, 6) as shot}
            <a href={shot.path_full} target="_blank" rel="noopener noreferrer">
              <img
                src={shot.path_thumbnail}
                alt="screenshot"
                class="rounded-lg w-full object-cover hover:scale-105 transition-transform"
              />
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- PC Requirements -->
    <div>
      <h2 class="text-xl font-bold mb-3">Requisitos de Sistema (PC)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-surface rounded-xl p-5 text-sm">
          <p class="font-semibold text-primary mb-2">Mínimos</p>
          {@html game.pc_requirements.minimum}
        </div>
        <div class="bg-surface rounded-xl p-5 text-sm">
          <p class="font-semibold text-primary mb-2">Recomendados</p>
          {@html game.pc_requirements.recommended}
        </div>
      </div>
    </div>

    <!-- Player Achievements -->
    {#if playerStats?.achievements && playerStats.achievements.length > 0}
      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-xl font-bold">Suas Conquistas</h2>
          <span class="text-sm text-foreground/60">
            🏆 {unlockedAchievements.length} / {totalAchievements} desbloqueadas
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-foreground/10 rounded-full h-2 mb-4">
          <div
            class="bg-primary h-2 rounded-full transition-all"
            style={`width: ${totalAchievements > 0 ? (unlockedAchievements.length / totalAchievements) * 100 : 0}%`}
          ></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {#each playerStats.achievements as ach}
            <div
              class="flex items-center gap-3 bg-surface rounded-xl p-3 {ach.achieved
                ? 'opacity-100'
                : 'opacity-40'}"
            >
              <span class="text-2xl">{ach.achieved ? "🏆" : "🔒"}</span>
              <div class="min-w-0">
                <p class="text-sm font-semibold truncate">{ach.apiname}</p>
                {#if ach.achieved && ach.unlocktime}
                  <p class="text-xs text-foreground/50">
                    {formatTimestamp(ach.unlocktime)}
                  </p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Highlighted achievements (from store) -->
    {#if game.achievements.highlighted.length > 0}
      <div>
        <h2 class="text-xl font-bold mb-3">Conquistas em Destaque</h2>
        <div class="flex flex-wrap gap-4">
          {#each game.achievements.highlighted as ach}
            <div
              class="flex flex-col items-center gap-1 bg-surface rounded-xl p-3 w-20"
            >
              <img src={ach.path} alt={ach.name} class="w-12 h-12" />
              <p class="text-xs text-center leading-tight">{ach.name}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="flex items-center justify-center h-64 text-foreground/50">
    <p>Jogo não encontrado.</p>
  </div>
{/if}
