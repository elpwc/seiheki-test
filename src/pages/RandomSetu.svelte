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
  let r18type: 0 | 1 | 2 = 1;
  onMount(async () => {
    image = await Utils.get_setu('贫乳', r18type, ['small']);
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
      image = await Utils.get_setu(inputvalue, 1, ['small', 'original']);

      console.log('image', image, image?.urls);
    }}>GET SETU</button
  >

  <div style="display:flex; justify-content:center;">
    <input type="radio" id="R18" bind:group={r18type} value={1} /><label for="R18">R18 Only</label>
    <input type="radio" id="Safe" bind:group={r18type} value={0} /><label for="Safe">Safe Only</label>
    <input type="radio" id="Mix" bind:group={r18type} value={2} /><label for="Mix">Mix</label>
  </div>

  <p>{image?.title + ' - ' + image?.author}</p>
  <a href={image?.urls.original} target="_blank">查看原图</a>

  <img width="100%" height="100%" src={image?.urls.small} alt={image?.title} />
</div>

<style>
</style>
