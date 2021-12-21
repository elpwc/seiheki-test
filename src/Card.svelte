<script lang="ts">
	import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
import App from "./App.svelte";
	import { currentPage, lists, winHeight, winWidth } from "./stores";
	onMount(async () => {});

	onDestroy(() => {});

	beforeUpdate(() => {});

	afterUpdate(() => {});

	export let top: number = 0;
	export let left: number = 0;
	export let className: string = '';
	let height: number = 0;
	let width: number = 0;
	winWidth.subscribe((_) => {
		width = _;
	});
	winHeight.subscribe((_) => {
		height = _;
	});
</script>

<div class={`card ${className}`} style={`width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px;`} on:drag>
	<slot />
</div>

<style>
	.card {
		position: fixed;
	}
</style>
