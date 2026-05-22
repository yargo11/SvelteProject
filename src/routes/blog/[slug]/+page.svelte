<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<article>
  <h1>{data.title}</h1>
  <p>{data.content}</p>
</article>

<a href="/">Voltar para home</a>
