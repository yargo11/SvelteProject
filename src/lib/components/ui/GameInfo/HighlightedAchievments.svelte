<script lang="ts">
  let { data } = $props();
</script>

{#if data.game.achievements?.highlighted?.length && data.game.achievements?.highlighted?.length > 0}
  <div>
    <h2 class="text-xl font-bold mb-3">Conquistas em Destaque</h2>
    <div class="flex flex-wrap gap-4">
      {#each data.game.achievements?.highlighted ?? [] as ach}
        <div
          class="flex flex-col items-center gap-1 bg-surface border border-border rounded-xl p-3 w-20 hover:border-primary/40 transition-colors"
        >
          <img src={ach.path} alt={ach.name} class="w-12 h-12" />
          <p class="text-xs text-center leading-tight text-muted">
            {ach.name}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
