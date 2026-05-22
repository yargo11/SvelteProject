<script lang="ts">
  let {
    src,
    alt,
    name,
    headertitle,
  }: { src?: string; alt?: string; name?: string; headertitle?: any } =
    $props();
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
  <img {src} {alt} />
  <h2>{name}</h2>
  {@render headertitle("This is a Custom Header Title")}
</div>
