<!--
  自定义Modal组件
  Author: wniko
-->
<script lang="ts">
  import gsap from 'gsap/all';
  import { onDestroy, onMount } from 'svelte';

  export let width: string = '60%';

  onMount(async () => {
    gsap.from('#bg', {
      duration: 0.5,
      opacity: 0,
      ease: 'none',
    });
    gsap.from('.modal', {
      duration: 0.5,
      opacity: 0,
      top: '100%',
      ease: 'power3.out',
    });
  });

  onDestroy(async () => {});
</script>

<div id="container">
  <div id="bg" />

  <div class="modal"  style={`width: ${width}`}>
    <slot />
  </div>
</div>

<style>
  #bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: darkgray;
    opacity: 0.5;
  }
  .modal {
    position: absolute;
    top: 30%;
    height: fit-content;
    background-color: white;
    z-index: 1;
    border-radius: 10px;
  }
  #container {
    position: absolute;
    z-index: 100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>
