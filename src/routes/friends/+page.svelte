<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-3 p-6 w-full">
  {#if data.friendList.length === 0}
    <p class="text-red-500">
      No friends found. Check your MY_STEAM_ID in .env.
    </p>
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
