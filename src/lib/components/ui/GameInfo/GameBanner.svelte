<script lang="ts">
  let { data } = $props();
</script>

<div
  class="relative w-full h-72 bg-cover bg-center rounded-xl overflow-hidden mb-8"
  style={`background-image: url('${data.game.background_raw}')`}
>
  <div class="absolute inset-0 bg-black/60 flex items-end p-6 gap-4">
    <img src={data.game.header_image} alt={data.game.name} class="h-20 rounded-lg shadow-lg" />
    <div>
      <h1 class="text-3xl font-bold text-white">{data.game.name}</h1>
      <p class="text-sm text-white/70 mt-1">
        {data.game.developers.join(", ")} &bull; {data.game.release_date.date}
      </p>
    </div>
  </div>
</div>
