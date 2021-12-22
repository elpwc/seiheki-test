<script lang="ts">
  import gsap from 'gsap/all';
  import { onMount } from 'svelte';
  import { currentPage_s, winHeight_s, winWidth_s } from './stores';

  const chong_onclick = () => {
    gsap.from('#chong', {
      duration: 1,
      width: 220,
      height: 220,
      borderRadius: 220,
      backgroundColor: 'white',
      ease: 'power3.out',
    });
    gsap.to('#chong', {
      duration: 1,
      width: 1000,
      height: 1000,
      borderRadius: 1000,
      backgroundColor: 'white',
      ease: 'power3.out',
      onComplete: () => {
        currentPage_s.set('select');
      },
    });
  };

  onMount(async () => {
    move();
  });

  let winheight = 0,
    winwidth = 0;
  winHeight_s.subscribe((v) => {
    winheight = v;
  });
  winWidth_s.subscribe((v) => {
    winwidth = v;
  });

  const move = () => {
    gsap.from('.tip', {
      duration: 1,
      top: 0.5 * winheight,
      ease: 'power3.out',
    });
    gsap.to('.tip', {
      duration: 1,
      top: 0.6 * winheight,
      ease: 'power3.out',
    });
    gsap.from('.tip', {
      duration: 1,
      delay: 1,
      top: 0.6 * winheight,
      ease: 'power3.out',
    });
    gsap.to('.tip', {
      duration: 1,
      delay: 1,
      top: 0.5 * winheight,
      ease: 'power3.out',
      onComplete: () => {
        move();
      },
    });
  };
</script>

<div>
  <div>
    <p class="title">性癖等级测试器</p>
    <div class="tip">
      <p>点下面按钮开始测试</p>
    </div>
  </div>

  <div class="chong_container" style="">
    <button id="chong" on:click|once={chong_onclick}>冲</button>
  </div>
</div>

<style>
  .title {
    font-size: 40px;
    font-weight: bold;
  }
  .tip {
    position: fixed;
  }
  .chong_container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #chong {
    background-color: rgba(255, 255, 255, 100);
    color: black;
    width: 220px;
    height: 220px;
    border: none;
    border-radius: 220px;
    font-size: 100px;
    font-weight: bold;
  }
</style>
