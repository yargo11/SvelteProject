<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Nav from "$lib/components/layout/Nav.svelte";
  import Profile from "$lib/components/layout/Profile.svelte";
  import SideMenu from "$lib/components/layout/SideMenu.svelte";

  import "../app.css";
  import { theme } from "../stores/theme";

  let { children } = $props();

  let sidebarOpen = $state(false);

  $effect(() => {
    document.documentElement.classList.toggle("dark", $theme === "dark");
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Nav
  onToggleSidebar={() => (sidebarOpen = !sidebarOpen)}
  onToggleTheme={() => theme.toggleTheme()}
/>
<div class="flex">
  <aside
    class="{sidebarOpen
      ? 'block'
      : 'hidden'} md:block min-h-[calc(100vh-4rem)] w-64 bg-surface border-r border-border"
  >
    <Profile />
    <hr class="my-4 border-border" />
    <SideMenu />
  </aside>

  <main class="flex-1 p-6">
    {@render children()}
  </main>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html),
  :global(body) {
    background-color: var(--background);
    color: var(--primary);
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  :global(h1, h2) {
    margin: 0;
    padding: 0;
    border: 0;
  }
</style>
