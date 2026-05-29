<script lang="ts">
  import { minutesToHours } from "$lib/utils/games";

  let { data } = $props();
</script>

<div class="bg-surface border border-border rounded-xl p-6">
  <h2 class="text-base font-bold mb-4">Suas Estatísticas</h2>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div>
      <p class="text-2xl font-bold text-accent">
        {minutesToHours(data.owned.playtime_forever)}
      </p>
      <p class="text-xs text-muted mt-1">Tempo total</p>
    </div>
    {#if data.recent}
      <div>
        <p class="text-2xl font-bold text-accent">
          {minutesToHours(data.recent.playtime_2weeks)}
        </p>
        <p class="text-xs text-muted mt-1">Últimas 2 semanas</p>
      </div>
    {/if}
    <div>
      <p class="text-2xl font-bold text-accent">
        {minutesToHours(data.owned.playtime_windows_forever)}
      </p>
      <p class="text-xs text-muted mt-1">No Windows</p>
    </div>
    {#if data.owned.rtime_last_played}
      <div>
        <p class="text-lg font-bold text-accent">
          {new Date(data.owned.rtime_last_played * 1000).toLocaleDateString(
            "pt-BR",
            { day: "2-digit", month: "2-digit", year: "numeric" },
          )}
        </p>
        <p class="text-xs text-muted mt-1">Última vez jogado</p>
      </div>
    {/if}
  </div>
</div>
