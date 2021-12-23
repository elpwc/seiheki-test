<script lang="ts">
  import gsap, { CustomEase } from 'gsap/all';
  import { onMount } from 'svelte';
  import { currentPage_s, winHeight_s, winWidth_s, currentSeihekiPage_s } from './stores';

  let start_clicked: boolean = false;

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
      onComplete: () => {
      },
    });
  };

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
  <div>
    <p class="title">
      性癖等级测试器<br />
      <span style="font-size: 10px; font-weight: normal;">Author <i>wniko</i> 2022 ver 0.0.1.0</span>
    </p>
    <div>
      <button
        class="top-button"
        on:click={() => {
          currentPage_s.set('about');
        }}>About</button
      >
      <button
        class="top-button"
        on:click={() => {
          window.open('https://github.com/elpwc/seiheki-test', '_blank');
        }}
      >
        <span style="text-align: left;"
          ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            /></svg
          ></span
        >
        Github</button
      >
    </div>
    <div class="tip">
      <p>点下面按钮开始测试捏</p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
        </svg>
      </p>
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

<style>
  .title {
    font-size: 40px;
    font-weight: bold;
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
  .top-button {
    background-color: white;
    border: 1px solid darkgray;
    width: 35vw;
    border-radius: 10px;
  }
</style>
