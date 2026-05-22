<script lang="ts">
  let {
    message = "Nenhum resultado encontrado.",
    icon = "🔍",
  }: { message?: string; icon?: string } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted">
  <span class="text-4xl">{icon}</span>
  <p class="text-sm max-w-xs">{message}</p>
</div>
