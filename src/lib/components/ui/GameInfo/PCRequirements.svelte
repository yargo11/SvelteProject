<script lang="ts">
  let { data } = $props();
</script>

<div>
  <h2 class="text-xl font-bold mb-3">Requisitos de Sistema (PC)</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-surface border border-border rounded-xl p-5 text-sm">
      <p class="font-semibold text-warning mb-2">Mínimos</p>
      {@html data.game.pc_requirements?.minimum ?? "<p>Não informado.</p>"}
    </div>
    <div class="bg-surface border border-border rounded-xl p-5 text-sm">
      <p class="font-semibold text-success mb-2">Recomendados</p>
      {@html data.game.pc_requirements?.recommended ?? "<p>Não informado.</p>"}
    </div>
  </div>
</div>
