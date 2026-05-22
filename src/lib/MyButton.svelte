<script lang="ts">
  let {
    showModal = $bindable(),
    onclick,
    name,
  }: { showModal?: boolean; onclick?: () => void; name?: string } = $props();
</script>

<div class="flex items-center justify-center">
  <button
    onclick={onclick || (() => (showModal = !showModal))}
    class="rounded-lg bg-background px-8 py-2 text-primary transition hover:bg-primary hover:text-background"
  >
    {name || "My Button"}</button
  >
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
