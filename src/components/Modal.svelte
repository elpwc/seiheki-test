<!--
  自定义Modal组件
  Author: wniko
-->
<script lang="ts">
  import gsap from 'gsap/all';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Button from './Button.svelte';

  export let title: string = '';
  export let width: string = '60%';
  export let top: string = '30%';
  export let showOkButton: boolean = false;
  export let showCloseButton: boolean = false;
  export let okButtonText = 'OK';
  export let closeButtonText = 'Close';
  export let onOKButtonClick: (value?: any) => void = () => {};
  export let onCloseButtonClick: (value?: any) => void = () => {};
  export let onFlyOutEnd: (value?: any) => void = () => {};
  //export let onLoad: (value?: any) => void = () => {};
  export let visible: boolean = false;
  /** 关闭时强制刷新 */
  //export let refreshOnClose: boolean = false;
</script>

{#if visible}
  <div id="container">
    <div id="bg" transition:fade={{ duration: 300 }} on:outroend={onFlyOutEnd} />

    <div class="modal" style={`width: ${width}; top: ${top};`} transition:fly={{ y: 200, duration: 300 }}>
      <!--标题-->
      {#if title}
        <p class="title">{title}</p>
        <hr />
      {/if}
      <div style="padding: 5px;">
        <slot />
        <div style="display:flex; justify-content:space-around;">
          {#if showOkButton}
            <Button on:click={onOKButtonClick} style="margin-right: 5px;">{okButtonText}</Button>
          {/if}
          {#if showCloseButton}
            <Button on:click={onCloseButtonClick}>{closeButtonText}</Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

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
  .title {
    width: 100%;
    text-align: center;
  }
</style>
