<script lang="ts">
  import type Seiheki from './objects/seiheki';
  import { SeihekiBuilder } from './objects/seiheki';
  import Card from './Card.svelte';
  import { currentSeihekiPage_s, winHeight_s, winWidth_s, device, selected, scoreSum_s, seiheki_data, currentPage_s, level_data } from './stores';
  import SeihekiShow from './SeihekiShow.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import Home from './Home.svelte';
  import test_data from './data/_safe.json';

  import seiheki_json from './dataLoader';
  import { LevelBuilder } from './objects/level';
  import About from './About.svelte';
  import Utils from './utils/utils';

  import Result from './Result.svelte';

  const safe_mode = false; // office developping mode

  onMount(async () => {
    winHeight_s.set(window.innerHeight);
    winWidth_s.set(window.innerWidth);

    if (safe_mode) {
      test_data.seihekis.forEach((seiheki) => {
        seiheki_data.push(SeihekiBuilder(seiheki.title, 1, seiheki.score, seiheki.desc));
      });
    } else {
      seiheki_json.forEach((level_d, level: number) => {
        // @ts-ignore
        level_data.push(LevelBuilder(level_d.config.title, level + 1, level_d.config.color, level_d.config.desc));
        level_d.seihekis.forEach((seiheki) => {
          seiheki_data.push(SeihekiBuilder(seiheki.title, level + 1, seiheki.score, seiheki.desc));
        });
      });
    }
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

  scoreSum_s.subscribe((v) => {
    scoreSum = v;
  });

  currentPage_s.subscribe((v) => {
    currentPage = v;
    switch (v) {
      case 'home':
        backgroundColor = '#f8f8f8';
        break;
      case 'select':
        backgroundColor = '#47c99e';
        break;
      case 'about':
        backgroundColor = '#f8f8f8';
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
  currentSeihekiPage_s.subscribe((v) => {
    last_page = currentSeihekiPage;
    current_level = seiheki_data[v]?.level;
    // level changed
    if (seiheki_data.length > 0 && last_level !== current_level) {
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

<main>
  <div class="page bg" style={`z-index: 0; background-color: ${backgroundColor}`} />

  <div class="tipbox leveltip">
    <p style={`color: ${backgroundColor}; font-size: 20px; font-weight: bold; margin-right: 10px; width: 220px; margin-top: 10px;`}>
      {`${Utils.convert_to_rome(level_data[current_level - 1]?.level)}级xp`}<br />{`"${level_data[current_level - 1]?.title}"`}
    </p>
    <p style={`color: ${backgroundColor}; font-size: 10px; width: 400px;`}>{level_data[current_level - 1]?.description}</p>
  </div>

  <div class="tipbox scoretip" style="top: 23%;">
    <p style={`color: black; font-size: 10px; margin-right: 10px; width: 500px; margin-top: 10px;`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        />
      </svg>
      提示：评分是指<b>对相关作品的接受程度</b>，而不是自身能经历的程度。
    </p>
  </div>

  <div class="page" style="z-index: 1;">
    {#if currentPage === 'home' || currentPage === 'about'}
      <div>
        <Card left={0}>
          <Home />
          {#if currentPage === 'about'}
            <About />
          {/if}
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
    {:else}
      <div><Card left={0}>404</Card></div>
    {/if}
  </div>

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
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" /></svg
        >
        {#if currentSeihekiPage === 0}
          <span>回到首页</span>
        {:else}
          <span>上一个</span>
        {/if}
      </div>

      <div class="header-item">{`${scoreSum}'`}</div>

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
  }

  .bg {
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
