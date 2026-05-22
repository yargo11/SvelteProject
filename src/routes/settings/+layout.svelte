<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	import type {LayoutProps} from './$types'

	let { data, children } : LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>
	Settings
</h1>

<div class="submenu">
	{#each data.sections as section}
		<a href="/settings/{section.slug}">{section.title}</a><br/>
	{/each}
</div>

{@render children()}
