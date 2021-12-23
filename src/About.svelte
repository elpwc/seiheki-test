<script>
  import gsap from 'gsap/all';
  import Button from './components/Button.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { currentPage_s } from './stores';

  onMount(async () => {
    gsap.from('#bg', {
      duration: 1,
      opacity: 0,
      ease: 'none',
    });
    gsap.from('.modal', {
      duration: 1,
      opacity: 0,
      top: '100%',
      ease: 'power3.out',
    });
  });

  onDestroy(async () => {});
</script>

<div style="position:absolute;z-index: 4;left:0;right:0;top:0;bottom:0;">
  <div id="bg" />

  <div class="modal" style="top: 30%;">
    <p>说明</p>
    <hr />
    <p>懒得写东西 摸了</p>
    <Button
      on:click={() => {
        gsap.to('#bg', {
          duration: 1,
          opacity: 0,
          ease: 'none',
        });
        gsap.to('.modal', {
          duration: 1,
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
    left: 20%;
    width: 60%;
    height: 30%;
    background-color: white;
    z-index: 1;
    border-radius: 10px;
  }
</style>
