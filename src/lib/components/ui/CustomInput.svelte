<script lang="ts">
  let {
    value = $bindable(),
    placeholder = "Pesquisar...",
  }: {
    value: string;
    placeholder: string;
  } = $props();
</script>

<input
  class="bg-surface border border-border rounded-lg w-full h-10 px-4 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
  placeholder={`🔍 ${placeholder}`}
  bind:value
/>
