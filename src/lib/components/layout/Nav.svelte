<script lang="ts">
  import MyButton from "$lib/MyButton.svelte";

  type NavProps = {
    onToggleSidebar: () => void;
    onToggleTheme: () => void;
  };

  let { onToggleSidebar, onToggleTheme }: NavProps = $props();
</script>

<nav
  class="flex flex-row justify-between items-center gap-1 p-1 bg-surface border-b border-border"
>
  <div class="flex flex-row items-center gap-4">
    <MyButton name="Menu" onclick={onToggleSidebar} />
    <a
      href="/"
      class="text-lg no-underline text-primary hover:text-accent transition-colors"
    >
      HOME
    </a>
  </div>
  <div>
    <MyButton name="🌗" onclick={onToggleTheme} />
  </div>
</nav>
