<script lang="ts">
  let { gameItem, game } = $props();
</script>

<div
  style="
    display:flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #eee;
    border-radius: 0.5rem;
    margin-top: 1rem;
    width: fit-content;
    gap:1rem"
>
  {@render gameItem(game)}
</div>
