<script lang="ts">
	import type Item from "./objects/item";
	import { onMount } from "svelte";
	import ItemShow from "./ItemShow.svelte";
	import Card from "./Card.svelte";
	import { currentPage, lists, winHeight, winWidth } from "./stores";

	import gsap from 'gsap';

	onMount(async () => {
		winHeight.set(window.innerHeight);
		winWidth.set(window.innerWidth);
	});

	window.addEventListener("resize", () => {
		winHeight.set(window.innerHeight);
		winWidth.set(window.innerWidth);
	});

	let w_height: number = 0;
	let w_width: number = 0;

	let pagesdata: Item[] = [];

	let currentPage_v: number = 0;

	winWidth.subscribe((_) => {
		w_width = _;
	});
	winHeight.subscribe((_) => {
		w_height = _;
	});
	lists.subscribe((_) => {
		let n: number = 0;
		_.forEach((lv: string[], index) => {
			lv.forEach((item: string) => {
				pagesdata.push({ title: item, level: n });
				n++;
			});
		});
	});
	let change:boolean = false;
	currentPage.subscribe((_) => {
		gsap.from('.card1',{
			duration: 3,
			left: 0,
			ease: 'elastic.out(1, 0.3)'
		});
		gsap.to('.card1',{
			duration: 3,
			left: 500,
			ease: 'elastic.out(1, 0.3)'
		});
		gsap.from('.card2',{
			duration: 3,
			left: 500,
			ease: 'elastic.out(1, 0.3)'
		});
		gsap.to('.card2',{
			duration: 3,
			left: 0,
			ease: 'elastic.out(1, 0.3)'
		});
		currentPage_v = _;
	});
	let left1:number = 0;
	let left2:number = w_width;

	
</script>

<main>
	<div class="page bg" style="z-index: 0;" />
	
	{left1}{left2}
	<div class="page" style="z-index: 1;">
		<!--
		<Card className={`animate__animated ${change? 'animate__backInRight':''}`} bind:left={left1}>
			<ItemShow data={pagesdata[currentPage_v + 1]} />
		</Card>
		<Card className={`animate__animated ${change? 'animate__backOutLeft':''}`} bind:left={left2}>
			<ItemShow data={pagesdata[currentPage_v + 2]} />
		</Card>
		-->
		<Card className={`card1`} bind:left={left1}>
			<ItemShow data={pagesdata[currentPage_v + 1]} />
		</Card>
		<Card className={`card2`} bind:left={left2}>
			<ItemShow data={pagesdata[currentPage_v + 2]} />
		</Card>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.page {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.bg {
		background-color: aquamarine;
	}
</style>
