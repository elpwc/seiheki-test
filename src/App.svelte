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
    });
  };

  let last_page = 0;
  let last_level = 0;
  currentSeihekiPage_s.subscribe((v) => {
    last_page = currentSeihekiPage;
    if (seiheki_data.length > 0 && last_level !== seiheki_data[v]?.level) {
      // @ts-ignore
      backgroundColor = seiheki_json[seiheki_data[v]?.level - 1].config.color;
      change_bg(backgroundColor);
    }

    last_level = seiheki_data[v]?.level;

    currentSeihekiPage = v;
    if (last_page > currentSeihekiPage) {
      gsap.from('.card1', {
        duration: 1,
        left: -w_width,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to('.card1', {
        duration: 1,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.from('.card2', {
        duration: 1,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to('.card2', {
        duration: 1,
        left: w_width,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {},
      });
    } else {
      gsap.from('.card1', {
        duration: 1,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to('.card1', {
        duration: 1,
        left: -w_width,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.from('.card2', {
        duration: 1,
        left: w_width,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to('.card2', {
        duration: 1,
        left: 0,
        ease: 'elastic.out(1, 0.3)',
        onComplete: () => {},
      });
    }
  });
</script>

<main>
  <div class="page bg" style={`z-index: 0; background-color: ${backgroundColor}`} />

  <div class="page" style="z-index: 1;">
    {#if currentPage === 'home'}
      <div>
        <Card left={0}>
          <Home />
        </Card>
      </div>
    {:else if currentPage === 'about'}
      <div>
        <Card left={0}>about</Card>
      </div>
    {:else if currentPage === 'complete'}
      <div>
        <Card left={0}>complete</Card>
      </div>
    {:else if currentPage === 'select'}
      <div>
        <Card className={`card1`} left={-w_width}>
          <SeihekiShow color={backgroundColor} data={seiheki_data[currentSeihekiPage]} />
        </Card>
        <Card className={`card2`} left={0}>
          <SeihekiShow color={backgroundColor} data={seiheki_data[currentSeihekiPage]} />
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
</style>
