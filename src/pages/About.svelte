<!--
  关于Modal
  Author: wniko
  Date: 2022-1-28
-->
<script>
  import gsap from 'gsap/all';
  import Button from '../components/Button.svelte';
  import { currentPage_s } from '../stores';
  import Modal from '../components/Modal.svelte';
</script>

<Modal width="60%">
  <!--标题-->
  <p>说明</p>
  <hr />

  <!--内容-->
  <div style="padding: 5px;">
    <p>懒得写东西 摸了</p>
    <p>具体请点进右边gayhub下拉看说明喵</p>
    <Button
      on:click={() => {
        currentPage_s.set('complete');
      }}>result test</Button
    >
    <Button
      on:click={() => {
        // 背景变淡，modal淡出动画
        gsap.to('#bg', {
          duration: 0.3,
          opacity: 0,
          ease: 'none',
        });
        gsap.to('.modal', {
          duration: 0.3,
          opacity: 0,
          top: '100%',
          ease: 'power3.out',
          onComplete: () => {
            currentPage_s.set('home');
          },
        });
      }}>嗯。</Button
    >
  </div>
</Modal>

<style>
</style>
