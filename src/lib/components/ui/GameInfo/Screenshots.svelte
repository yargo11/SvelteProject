<script lang="ts">
  let { data } = $props();
</script>

{#if data.game.screenshots.length > 0}
  <div>
    <h2 class="text-xl font-bold mb-3">Screenshots</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      {#each data.game.screenshots.slice(0, 6) as shot}
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
