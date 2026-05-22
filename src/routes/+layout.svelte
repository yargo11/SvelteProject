<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import MyButton from "$lib/MyButton.svelte";

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

<nav class="flex flex-row justify-between items-center gap-1 p-1 bg-surface border-b border-border">
  <div class="flex flex-row items-center gap-4">
    <MyButton name="Menu" onclick={() => (sidebarOpen = !sidebarOpen)} />
    <a
      href="/"
      class="text-lg no-underline text-primary hover:text-accent transition-colors"
    >
      HOME
    </a>
  </div>
  <div>
    <MyButton name="🌗" onclick={() => theme.toggleTheme()} />
  </div>
</nav>
<div class="flex">
  <aside
    class="{sidebarOpen
      ? 'block'
      : 'hidden'} md:block min-h-[calc(100vh-4rem)] w-64 bg-surface border-r border-border"
  >
    <div id="ProfilePicture" class="relative p-4 flex flex-row">
      <video
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 z-0 object-cover w-full"
      >
        <source
          src="https://shared.fastly.steamstatic.com/community_assets/images/items/1239690/09c56c4e74c711142f8a4c26a3441c7580c60a43.webm"
          type="video/webm"
        />
      </video>
      <div class="relative h-[100px] w-[100px] overflow-hidden rounded-lg">
        <img
          src="https://avatars.fastly.steamstatic.com/2f9155df69a53f918625e33d15a5ee8e70f4c235_full.jpg"
          alt="Yargo Avatar"
          class="relative z-10 h-full w-full rounded-lg object-cover p-2"
        />
        <img
          src="https://shared.fastly.steamstatic.com/community_assets/images/items/1239690/191009a5294dbd4e5a3e31e852bff4995a73d20f.png"
          alt=""
          class="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
        />
      </div>
      <div
        class="flex flex-col px-2 relative z-10 bg-background/70 rounded-lg h-fit mt-auto mb-2"
      >
        <h3 class="text-lg font-bold text-foreground">Kyanchome</h3>
        <h4 class="text-sm text-muted">Yargo Valerio</h4>
      </div>
    </div>
    <hr class="my-4 border-border" />
    <ul class="space-y-1 px-2">
      <li>
        <a
          href="/profile/76561198057548002"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:bg-primary-dim hover:text-primary transition-colors"
        >
          👤 Profile
        </a>
      </li>
      <li>
        <a
          href="/games"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:bg-primary-dim hover:text-primary transition-colors"
        >
          🎮 Games
        </a>
      </li>
      <li>
        <a
          href="/games/favorites"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:bg-primary-dim hover:text-primary transition-colors"
        >
          ❤️ Favorite Games
        </a>
      </li>
      <li>
        <a
          href="/friends"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:bg-primary-dim hover:text-primary transition-colors"
        >
          👥 Friends
        </a>
      </li>
    </ul>
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
