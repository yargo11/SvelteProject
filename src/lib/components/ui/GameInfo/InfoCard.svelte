<script lang="ts">
  let { data } = $props();

  const platformIcons: Record<string, string> = {
    windows: "🪟",
    mac: "🍎",
    linux: "🐧",
  };
</script>

<div
  class="bg-surface border border-border rounded-xl p-6 flex flex-col gap-3 text-sm"
>
  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Preço</p>
    {#if data.game.is_free}
      <p class="text-success font-bold text-lg">Gratuito</p>
    {:else}
      <p class="font-bold text-lg">
        {data.game.price_overview?.final_formatted ?? "—"}
      </p>
    {/if}
  </div>

  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Desenvolvedor</p>
    <p>{data.game.developers.join(", ")}</p>
  </div>

  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Publicador</p>
    <p>{data.game.publishers.join(", ")}</p>
  </div>

  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Plataformas</p>
    <div class="flex gap-2 text-base">
      {#each Object.entries(data.game.platforms) as [platform, supported]}
        {#if supported}
          <span title={platform}>{platformIcons[platform]}</span>
        {/if}
      {/each}
    </div>
  </div>

  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Recomendações</p>
    <p>👍 {data.game.recommendations.total.toLocaleString()}</p>
  </div>

  <div>
    <p class="text-muted text-xs uppercase font-semibold mb-1">Conquistas</p>
    <p>🏆 {data.game.achievements?.total || 0}</p>
  </div>

  {#if data.game.website}
    <a
      href={data.game.website}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto text-center bg-primary text-background rounded-lg py-2 font-semibold hover:opacity-90 transition-opacity"
    >
      Site Oficial
    </a>
  {/if}
</div>
