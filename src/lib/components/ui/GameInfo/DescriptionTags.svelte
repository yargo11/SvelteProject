<script lang="ts">
  let { data } = $props();
</script>

<div
  class="md:col-span-2 bg-surface border border-border rounded-xl p-6 flex flex-col gap-4"
>
  <p class="text-base leading-relaxed text-foreground">
    {data.game.short_description}
  </p>

  <div class="flex flex-wrap gap-2">
    {#each data.game.genres as genre}
      <span
        class="px-3 py-1 rounded-full bg-primary-dim text-primary text-xs font-semibold border border-primary/20"
      >
        {genre.description}
      </span>
    {/each}
    {#each data.game.categories.slice(0, 5) as cat}
      <span
        class="px-3 py-1 rounded-full bg-surface-alt border border-border text-xs text-muted"
      >
        {cat.description}
      </span>
    {/each}
  </div>
</div>
