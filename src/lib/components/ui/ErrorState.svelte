<script lang="ts">
  let {
    message = "Ocorreu um erro ao carregar os dados.",
    onRetry,
  }: { message?: string; onRetry: () => void } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-4 py-16 text-center">
  <span class="text-4xl">⚠️</span>
  <p class="text-danger max-w-sm">{message}</p>
  <button
    onclick={onRetry}
    class="px-5 py-2 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
  >
    Tentar novamente
  </button>
</div>
