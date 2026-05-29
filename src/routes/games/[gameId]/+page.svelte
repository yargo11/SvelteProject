<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import GameBanner from "$lib/components/ui/GameInfo/GameBanner.svelte";
  import HighlightedAchievments from "$lib/components/ui/GameInfo/HighlightedAchievments.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
  import MyStatistics from "$lib/components/ui/GameInfo/MyStatistics.svelte";
  import type { PageData } from "./$types";
  import DescriptionTags from "$lib/components/ui/GameInfo/DescriptionTags.svelte";
  import InfoCard from "$lib/components/ui/GameInfo/InfoCard.svelte";
  import PCRequirements from "$lib/components/ui/GameInfo/PCRequirements.svelte";
  import PlaterAchievments from "$lib/components/ui/GameInfo/PlaterAchievments.svelte";
  import Screenshots from "$lib/components/ui/GameInfo/Screenshots.svelte";

  let { data }: { data: PageData } = $props();

  const game = $derived(data.gameDetails?.data);
  const owned = $derived(data.ownedGame);
  const recent = $derived(data.recentGame);
  const playerStats = $derived(data.playerStats);

  const unlockedAchievements = $derived(
    playerStats?.achievements.filter((a) => a.achieved === 1) ?? [],
  );
  const totalAchievements = $derived(playerStats?.achievements.length ?? 0);

  let loading = $state(false);

  async function retry() {
    loading = true;
    await invalidateAll();
    loading = false;
  }
</script>

{#if loading}
  <LoadingSpinner />
{:else if data.error}
  <ErrorState message={data.error} onRetry={retry} />
{:else if game}
  <GameBanner data={{ game }} />
  <div class="flex flex-col gap-8">
    <!-- User stats -->
    {#if owned}
      <MyStatistics data={{ owned, recent }} />
    {/if}
    <!-- Summary row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Description + tags -->
      <DescriptionTags data={{ game }} />
      <!-- Info card -->
      <InfoCard data={{ game }} />
    </div>
    <Screenshots data={{ game }} />
    <PCRequirements data={{ game }} />
    <PlaterAchievments
      data={{ playerStats, unlockedAchievements, totalAchievements }}
    />
    <HighlightedAchievments data={{ game }} />
  </div>
{:else}
  <div class="flex flex-col items-center justify-center gap-4 h-64 text-muted">
    <span class="text-4xl">🎮</span>
    <p>Jogo não encontrado.</p>
    <button
      onclick={retry}
      class="px-5 py-2 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
    >
      Tentar novamente
    </button>
  </div>
{/if}
