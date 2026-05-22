<script lang="ts">
  let { children } = $props();
</script>

<main class="flex-1 p-6">
  {@render children?.()}
</main>
