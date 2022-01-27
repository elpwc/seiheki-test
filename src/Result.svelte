<script lang="ts">
  import { onMount } from 'svelte';
  import Utils from './utils/utils';

  let image: Types.Setu | undefined = undefined;
  let inputvalue: string = '';
  onMount(async () => {
    image = await Utils.get_setu('贫乳', 1, ['regular']);
    console.log('image', image, image?.urls);
  });
</script>

<div>
  <input bind:value={inputvalue} placeholder="这里输入xp" />
  <button
    on:click={async () => {
      image = await Utils.get_setu(inputvalue, 1, ['regular']);

      console.log('image', image, image?.urls);
    }}>GET SETU</button
  >
  <img width="100%" height="100%" src={image?.urls.regular} alt="setu desu" />
</div>

<style>
</style>
