<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import EmptyState from "$lib/components/ui/EmptyState.svelte";
  import ErrorState from "$lib/components/ui/ErrorState.svelte";
  import LoadingSpinner from "$lib/components/ui/LoadingSpinner.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let loading = $state(false);

  async function retry() {
    loading = true;
    await invalidateAll();
    loading = false;
  }
</script>

<div class="flex flex-col gap-3 p-6 w-full">
  {#if loading}
    <LoadingSpinner />
  {:else if data.error}
    <ErrorState message={data.error} onRetry={retry} />
  {:else if data.friendList.length === 0}
    <EmptyState message="Nenhum amigo encontrado." icon="👥" />
  {:else}
    {#each data.friendList as friend}
      <div class="flex flex-col gap-3 border p-4 rounded-lg bg-gray-800">
        <h2 class="text-xl font-bold">{friend.steamid}</h2>
        <p>{new Date(friend.friend_since * 1000).toLocaleString()}</p>
      </div>
    {/each}
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
