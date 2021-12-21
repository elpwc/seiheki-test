<script lang="ts">
	import type Item from "./objects/item";

	export let data: Item = { title: "", level: 0 };

	import { currentPage, lists, winHeight, winWidth } from "./stores";

	let currentPage_v: number = 0;
	currentPage.subscribe((_) => {
		currentPage_v = _;
	});
</script>

<div class="box">
	<p class="title">{data.title}</p>
	<button
		on:click={() => {
			currentPage.set(currentPage_v + 1);
		}}>1</button
	>
	<button>2</button>
	<button>3</button>
</div>

<style>
	.box {
		width: 100%;
		height: 100%;
	}
	.title {
		width: 100%;
		margin-top: 15%;
		font-size: 40px;
		font-weight: bold;
	}
</style>
