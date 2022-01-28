<!--
  涩图tag搜索
  Author: wniko
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { currentPage_s } from '../stores';
  import Utils from '../utils/utils';

  let image: Types.Setu | undefined = undefined;
  let inputvalue: string = '贫乳';
  onMount(async () => {
    image = await Utils.get_setu('贫乳', 1, ['small']);
    console.log('image', image, image?.urls);
  });
</script>

<div>
  <button
    on:click={() => {
      currentPage_s.set('home');
    }}>返回主页</button
  >
  <input bind:value={inputvalue} placeholder="这里输入xp" />
  <button
    on:click={async () => {
      image = await Utils.get_setu(inputvalue, 1, ['small']);

      console.log('image', image, image?.urls);
    }}>GET SETU</button
  >

  <p>{image?.title + ' ' + image?.author}</p>
  <img width="100%" height="100%" src={image?.urls.small} alt="setu desu" />
</div>

<style>
</style>
