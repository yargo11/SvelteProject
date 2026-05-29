<script lang="ts">
  let { data } = $props();

  const progressWidth = $derived(
    data.totalAchievements > 0
      ? (data.unlockedAchievements.length / data.totalAchievements) * 100
      : 0,
  );
</script>

<div class="w-full bg-border rounded-full h-2 mb-4">
  <div
    class="bg-accent h-2 rounded-full transition-all"
    style={`width: ${progressWidth}%`}
  ></div>
</div>
