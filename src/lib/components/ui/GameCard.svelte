<script lang="ts">
  import { GAME_COVER } from "$lib/endpoints";

  let { data } = $props();
</script>

<a href="/games/{data.game.appid}">
  <div
    class="rounded-lg bg-surface border border-border text-foreground w-fit hover:border-primary/40 transition-colors"
  >
    <img
      src={`${GAME_COVER}${data.game.appid}/header.jpg`}
      alt={data.game.name}
      class="rounded-t-lg"
    />
    <div class="p-4">
      <p class="text-sm font-semibold text-foreground">
        {data.game.name.slice(0, 30)}{data.game.name.length > 30 ? "..." : ""}
      </p>
    </div>
  </div>
</a>
