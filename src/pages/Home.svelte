<!--
  主页
  Author: wniko
-->
<script lang="ts">
  import gsap, { CustomEase } from 'gsap/all';
  import { onMount } from 'svelte';
  import About from './modals/AboutModal.svelte';
  import Button from '../components/Button.svelte';
  import { currentPage_s, winHeight_s, winWidth_s, currentSeihekiPage_s } from '../stores';
  import RankModal from './modals/RankModal.svelte';
  import Svg from '../components/Svg.svelte';

  /**
   * 是否已按下START按钮
   * @description 为了实现按下后背景旋转div取消显示
   */
  let start_clicked: boolean = false;

  /** 当前版本 */
  const VERSION = '0.0.3.1';
  /** 关于是否显示 */
  let aboutModalVisibility: boolean = false;
  let rankModalVisibility: boolean = false;

  /**
   * START按钮按下
   */
  const chong_onclick = () => {
    start_clicked = true;
    gsap.to('#chong', {
      duration: 0.5,
      width: 1100,
      height: 1100,
      borderRadius: 1100,
      ease: 'power4.out',
      bottom: '-120%',
      onComplete: () => {
        currentPage_s.set('select');
        currentSeihekiPage_s.set(0);
      },
    });
    gsap.to('#chong div', {
      duration: 0.5,
      opacity: 0,
      ease: 'power4.out',
      onComplete: () => {},
    });
  };

  // 获取store数据

  let currentPage = 'home';
  currentPage_s.subscribe((v) => {
    currentPage = v;
  });

  let winheight = 0,
    winwidth = 0;
  winHeight_s.subscribe((v) => {
    winheight = v;
  });
  winWidth_s.subscribe((v) => {
    winwidth = v;
  });

  onMount(async () => {
    gsap.to('.rotate_circle.c1', {
      duration: 3,
      rotation: 360,
      ease: 'none',
      repeat: -1,
    });
    gsap.to('.rotate_circle.c2', {
      duration: 5,
      rotation: 360,
      ease: 'none',
      repeat: -1,
    });
    gsap.to('.rotate_circle.c3', {
      duration: 2,
      rotation: 360,
      ease: 'none',
      repeat: -1,
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to('.tip', {
      duration: 1,
      top: '50%',
      ease: 'power3.out',
      reversed: true,
    });
    tl.to('.tip', {
      duration: 1,
      top: '50%',
      ease: 'power3.out',
    });

    gsap.to('#start_blue', {
      duration: 0.2,
      left: '8%',
      height: '29%',
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0.183,0.888 0.212,0.888 0.212,0.921 0.379,-0.007 0.38,0.026 0.408,0.026 0.489,0.822 0.518,0.822 0.518,0.855 0.627,-0.001 0.628,0.032 0.656,0.032 0.799,0.868 0.828,0.868 0.828,0.901 1,0 1,0 '
      ),
      repeat: -1,
      repeatDelay: 1.5,
    });
    gsap.to('#start_red', {
      duration: 0.2,
      left: '12%',
      height: '32%',
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0.183,0.888 0.212,0.888 0.212,0.921 0.379,-0.007 0.38,0.026 0.408,0.026 0.489,0.822 0.518,0.822 0.518,0.855 0.627,-0.001 0.628,0.032 0.656,0.032 0.799,0.868 0.828,0.868 0.828,0.901 1,0 1,0 '
      ),
      repeat: -1,
      repeatDelay: 1.5,
    });
  });
</script>

<div>
  <About
    onClose={() => {
      aboutModalVisibility = false;
    }}
    {aboutModalVisibility}
  />
  <RankModal
    onOK={() => {
      rankModalVisibility = false;
    }}
    {rankModalVisibility}
  />
  <div>
    <div class="title">
      <div style="display:flex; justify-content: center;">
        <img src="favicon.png" alt="logo" width="50px" height="50px" />
        <span>XP系统测试器</span>
      </div>
      <span style="font-size: 10px; font-weight: normal; color: darkgray;">Author <i>wniko</i> 2022 ver {VERSION}</span>
    </div>
    <div>
      <Button
        on:click={() => {
          rankModalVisibility = true;
        }}
      >
        <Svg name="rank" />
        排行榜</Button
      >
      <Button
        on:click={() => {
          currentPage_s.set('random');
        }}>来张涩图</Button
      >

      <Button
        on:click={() => {
          aboutModalVisibility = true;
        }}>说明</Button
      >
      <Button
        on:click={() => {
          window.open('https://github.com/elpwc/seiheki-test', '_blank');
        }}
      >
        <span style="text-align: left;"><Svg name="github" /></span>
        GitHub
        <span style="text-align: right; color: darkgray;"> <Svg name="link" /></span>
      </Button>
    </div>
    <div class="tip">
      <p>点下面按钮开始测试捏</p>
      <p><Svg name="downarrow" /></p>
    </div>
  </div>

  <div class="chong_container" style="">
    <div id="chong" style="background-color: #47c99e;" on:click|once={chong_onclick}>
      <div style="z-index: 1;">START</div>
      {#if !start_clicked}
        <div id="start_blue" style="z-index: 0;color: #82eaff; top:30%; left: 9%;">START</div>
        <div id="start_red" style="z-index: 0;color: #ff8686; top:31%; left: 10%;">START</div>
      {/if}
    </div>

    {#if !start_clicked}
      <div class="rotate_circle c1" style="background-color: #47c99e;rotation: 0deg; transform-origin: 53% 53%; opacity: 0.5;" />
      <div class="rotate_circle c2" style="background-color: #47c99e;rotation: 0deg; transform-origin: 47% 47%; opacity: 0.5;" />
      <div class="rotate_circle c3" style="background-color: #47c99e;rotation: 0deg; transform-origin: 47% 53%; opacity: 0.5;" />
    {/if}
  </div>
</div>

<!--试图改为水波样式按钮的测试（摸了-->

<!--div>
  <div>

  </div>
  <div>
    <div id="chong" style="background-color: #47c99e;" on:click|once={chong_onclick}>
      <div style="z-index: 1;">START</div>
      {#if !start_clicked}
        <div id="start_blue" style="z-index: 0;color: #82eaff; top:30%; left: 9%;">START</div>
        <div id="start_red" style="z-index: 0;color: #ff8686; top:31%; left: 10%;">START</div>
      {/if}
    </div>
    <div>

    </div>
  </div>
</div-->
<style>
  .title {
    font-size: 40px;
    font-weight: bold;
    padding: 35px 0;
  }
  .tip {
    position: fixed;
    left: 0;
    right: 0;
    top: 45%;
    text-align: center;
  }
  .tip p {
    margin: 0;
    font-weight: bold;
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
    z-index: 1;
  }
  #chong {
    color: white;
    width: 220px;
    height: 220px;
    border: none;
    border-radius: 220px;
    font-size: 60px;
    font-weight: bold;
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #chong div {
    position: absolute;
  }
  .rotate_circle {
    width: 220px;
    height: 220px;
    border: none;
    border-radius: 220px;
    position: absolute;
    z-index: 0;
  }
</style>
