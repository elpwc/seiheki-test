<!--
  App容器，实现基于svelte stores的简易路由以实现SPA页面切换
  Author: wniko
-->
<script lang="ts">
  import type Seiheki from './utils/seiheki';
  import { SeihekiBuilder } from './utils/seiheki';
  import Card from './components/Card.svelte';
  import { currentSeihekiPage_s, winHeight_s, winWidth_s, scoreSum_s, currentPage_s } from './stores';
  import { device, seiheki_data, level_data } from './globals';
  import SeihekiShow from './pages/SeihekiShow.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import Home from './pages/Home.svelte';
  import test_data from './data/_safe.json';

  import seiheki_json from './utils/dataLoader';
  import { LevelBuilder } from './utils/level';
  import Utils from './utils/utils';

  import Result from './pages/Result.svelte';
  import RandomSetu from './pages/RandomSetu.svelte';
  import Svg from './components/Svg.svelte';
  import InDevModal from './pages/modals/InDevModal.svelte';
  import R18GWarnModal from './pages/modals/R18GWarnModal.svelte';

  /** SFW调试mode，在公司办公室开发时启用() */
  const safe_mode = false; // office developping mode

  onMount(async () => {
    winHeight_s.set(window.innerHeight);
    winWidth_s.set(window.innerWidth);

    // 导入性癖数据
    if (safe_mode) {
      test_data.seihekis.forEach((seiheki) => {
        seiheki_data.push(SeihekiBuilder(seiheki.title, 1, seiheki.score, seiheki.desc));
      });
    } else {
      seiheki_json.forEach((level_d, level: number) => {
        level_data.push(LevelBuilder(level_d.config.title, level + 1, level_d.config.color, level_d.config.desc));
        level_d.seihekis.forEach((seiheki) => {
          seiheki_data.push(SeihekiBuilder(seiheki.title, level + 1, seiheki.score, seiheki.desc));
        });
      });
    }

    inDevModalVisibility = true;
  });

  window.addEventListener('resize', () => {
    winHeight_s.set(window.innerHeight);
    winWidth_s.set(window.innerWidth);
  });

  let w_height: number = 0;
  let w_width: number = 0;

  let currentSeihekiPage: number = 0;
  let currentPage: string = '';

  let backgroundColor: string = '#f8f8f8';

  let scoreSum: number = 0;

  let inDevModalVisibility = false;
  let R18GWarnModalVisibility = false;

  // 从store读取数据
  // 当前分数
  scoreSum_s.subscribe((v) => {
    scoreSum = v;
  });

  // 当前页
  currentPage_s.subscribe((v) => {
    console.log('crt page: ', v);
    currentPage = v;
    // 页面背景
    switch (v) {
      case 'home':
        backgroundColor = '#f8f8f8';
        break;
      case 'select':
        backgroundColor = '#47c99e';
        break;
      case 'complete':
        backgroundColor = '#f8f8f8';
        change_bg('#f8f8f8');
        break;
      default:
        break;
    }
  });

  winWidth_s.subscribe((v) => {
    w_width = v;
  });
  winHeight_s.subscribe((v) => {
    w_height = v;
  });

  /**
   * 背景色过渡
   * @param to 目标色
   */
  const change_bg = async (to: string) => {
    gsap.to('.bg', {
      duration: 1,
      ease: 'none',
      backgroundColor: to,
      onComplete: () => {
        backgroundColor = to;
      },
    });
  };

  let last_page = -1;
  let last_level = 0,
    current_level = 0;
  // 当前性癖
  currentSeihekiPage_s.subscribe((v) => {
    last_page = currentSeihekiPage;
    current_level = seiheki_data[v]?.level;
    // level changed
    if (seiheki_data.length > 0 && last_level !== current_level) {
      if (current_level === 4) {
        R18GWarnModalVisibility = true;
      }

      // 等级tip
      const tl = gsap.timeline();
      tl.to('.leveltip', {
        duration: 0.5,
        right: '-50px',
        ease: 'back.out(1.7)',
      });
      tl.to(
        '.leveltip',
        {
          duration: 0.5,
          right: '-50px',
          ease: 'back.out(1.7)',
          reversed: true,
          onComplete: () => {},
        },
        5
      );

      change_bg(seiheki_json[current_level - 1].config.color);
    }

    last_level = seiheki_data[v]?.level;

    // 入场提示
    if (v === 0) {
      const tl2 = gsap.timeline();
      tl2.to('.scoretip', {
        duration: 0.5,
        right: '-50px',
        ease: 'back.out(1.7)',
      });
      tl2.to(
        '.scoretip',
        {
          duration: 0.5,
          right: '-50px',
          ease: 'back.out(1.7)',
          reversed: true,
        },
        5
      );
    }

    // 切换卡片
    if (last_page > v) {
      currentSeihekiPage = v;
      gsap.from('.card1', {
        duration: 0.8,
        left: -w_width,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.from('.card2', {
        duration: 0.8,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {
          // reset
          gsap.to('.card1', {
            duration: 0.5,
            left: 0,
            ease: 'elastic.out(1, 0.3)',
          });
          gsap.to('.card2', {
            duration: 0.5,
            left: w_width,
            ease: 'elastic.out(1, 0.3)',
          });
        },
      });
    } else {
      currentSeihekiPage = v;

      gsap.from('.card0', {
        duration: 0.8,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.from('.card1', {
        duration: 0.8,
        left: w_width,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {
          gsap.to('.card0', {
            duration: 0.5,
            left: -w_width,
            ease: 'elastic.out(1, 0.3)',
          });
          gsap.to('.card1', {
            duration: 0.5,
            left: 0,
            ease: 'elastic.out(1, 0.3)',
          });
        },
      });
    }
  });
</script>

<InDevModal
  onClose={() => {
    inDevModalVisibility = false;
  }}
  {inDevModalVisibility}
/>
<R18GWarnModal
  {R18GWarnModalVisibility}
  onContinue={() => {
    R18GWarnModalVisibility = false;
  }}
  onEnd={() => {
    currentPage_s.set('complete');
    R18GWarnModalVisibility = false;
  }}
/>
<main>
  <div class="page bg" style={`z-index: 0; background-color: ${backgroundColor}`} />

  <!--右上角Tips-->
  <div class="tipbox leveltip">
    <p style={`color: ${backgroundColor}; font-size: 20px; font-weight: bold; margin-right: 10px; width: 220px; margin-top: 10px;`}>
      {`${Utils.convert_to_rome(level_data[current_level - 1]?.level)}级xp`}<br />{`"${level_data[current_level - 1]?.title}"`}
    </p>
    <p style={`color: ${backgroundColor}; font-size: 10px; width: 400px;`}>{level_data[current_level - 1]?.description}</p>
  </div>

  <div class="tipbox scoretip" style="top: 23%;">
    <p style={`color: black; font-size: 10px; margin-right: 10px; width: 500px; margin-top: 10px;`}>
      <Svg name="info" />
      提示：评分是指<b>对相关作品的接受程度</b>，而不是自身能经历的程度。
    </p>
  </div>

  <!--页面内容 (简易SPA路由) -->
  <div class="page" style="z-index: 1;">
    {#if currentPage === 'home'}
      <div>
        <Card left={0}>
          <Home />
        </Card>
      </div>
    {:else if currentPage === 'complete'}
      <div>
        <Card left={0}><Result /></Card>
      </div>
    {:else if currentPage === 'select'}
      <div>
        <Card className={`card0`} left={-w_width}>
          <SeihekiShow color={backgroundColor} data={seiheki_data[currentSeihekiPage === 0 ? 0 : currentSeihekiPage - 1]} />
        </Card>
        <Card className={`card1`} left={0}>
          <SeihekiShow color={backgroundColor} data={seiheki_data[currentSeihekiPage]} />
        </Card>
        <Card className={`card2`} left={w_width}>
          <SeihekiShow color={backgroundColor} data={seiheki_data[currentSeihekiPage >= seiheki_data.length - 1 ? seiheki_data.length - 1 : currentSeihekiPage + 1]} />
        </Card>
      </div>
    {:else if currentPage === 'random'}
      <div>
        <Card left={0}><RandomSetu /></Card>
      </div>
    {:else}
      <div><Card left={0}>404</Card></div>
    {/if}
  </div>

  <!--性癖页时的header-->
  {#if currentPage === 'select'}
    <div class="header" style="z-index: 2;">
      <div
        class="header-item"
        on:click={() => {
          if (currentSeihekiPage > 0) {
            currentSeihekiPage_s.set(currentSeihekiPage - 1);
          } else {
            currentPage_s.set('home');
            backgroundColor = '#f8f8f8';
          }
        }}
      >
        <Svg name="back" />
        {#if currentSeihekiPage === 0}
          <span>回到首页</span>
        {:else}
          <span>上一个</span>
        {/if}
      </div>

      <!--当前分数-->
      <div class="header-item">{`${scoreSum}'`}</div>

      <!--当前进度-->
      <div class="header-item">
        {`${currentSeihekiPage + 1} / ${seiheki_data.length}`}
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  .page {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    height: fit-content;
    align-items: center;
    padding: 5px 10px;
  }
  .header-item {
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 100);
    display: flex;
    align-items: center;
  }

  .tipbox {
    position: fixed;
    right: -250px;
    padding-right: 50px;
    z-index: 5;
    width: 200px;
    height: fit-content;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
  .leveltip {
    top: 10%;
  }
</style>
