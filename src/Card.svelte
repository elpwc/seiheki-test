<script lang="ts">
import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";


	export let name: string = "default";

    onMount( async () => {

    });

    onDestroy(() => {});

    beforeUpdate(() => {});

    afterUpdate(() => {});

</script>

<div class="card">
	{name}
</div>

<style>
	.card {
		border: solid 1px darkgray;
		border-radius: 5px;
		box-shadow: 0 0 3px 1px rgb(172, 172, 172);
		background-color: white;
	}
</style>
