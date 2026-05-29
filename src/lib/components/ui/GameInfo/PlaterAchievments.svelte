<script lang="ts">
  import { minutesToHours } from "$lib/utils/games";
  import ProgressAchievmentBar from "$lib/components/ui/GameInfo/ProgressAchievmentBar.svelte";

  let { data } = $props();
</script>

{#if data.playerStats?.achievements && data.playerStats.achievements.length > 0}
  <div>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-bold">Suas Conquistas</h2>
      <span class="text-sm text-muted">
        🏆 {data.unlockedAchievements.length} / {data.totalAchievements} desbloqueadas
      </span>
    </div>

    <ProgressAchievmentBar
      data={{
        unlockedAchievements: data.unlockedAchievements,
        totalAchievements: data.totalAchievements,
      }}
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {#each data.playerStats.achievements as ach}
        <div
          class="flex items-center gap-3 bg-surface border rounded-xl p-3 transition-colors {ach.achieved
            ? 'border-accent/30 opacity-100'
            : 'border-border opacity-40'}"
        >
          <span class="text-2xl">{ach.achieved ? "🏆" : "🔒"}</span>
          <div class="min-w-0">
            <p class="text-sm font-semibold truncate">{ach.apiname}</p>
            {#if ach.achieved && ach.unlocktime}
              <p class="text-xs text-muted">
                {minutesToHours(ach.unlocktime)}
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
