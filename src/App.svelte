<script lang="ts">
  import type Seiheki from './objects/seiheki';
  import { SeihekiBuilder } from './objects/seiheki';
  import Card from './Card.svelte';
  import { currentPage, winHeight, winWidth, device, selected, score_sum } from './stores';
  import SeihekiShow from './SeihekiShow.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  import seiheki_lv1 from './data/seiheki_lv1.json';

  onMount(async () => {
    winHeight.set(window.innerHeight);
    winWidth.set(window.innerWidth);
    seiheki_lv1.seihekis.forEach((seiheki) => {
      seiheki_data.push(SeihekiBuilder(seiheki.title, 1, seiheki.score, seiheki.desc));
      seiheki_data = seiheki_data;
    });
  });

  window.addEventListener('resize', () => {
    winHeight.set(window.innerHeight);
    winWidth.set(window.innerWidth);
  });

  let w_height: number = 0;
  let w_width: number = 0;

  let seiheki_data: Seiheki[] = [];

  let currentPage_v: number = 0;

  winWidth.subscribe((_) => {
    w_width = _;
  });
  winHeight.subscribe((_) => {
    w_height = _;
  });

  let last_page = 0;
  currentPage.subscribe((_) => {
    last_page = currentPage_v;
    currentPage_v = _;
    if (last_page > currentPage_v) {
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
  <div class="page bg" style="z-index: 0;" />

  <div class="page" style="z-index: 1;">
    <Card className={`card1`} left={-w_width}>
      <SeihekiShow data={seiheki_data[currentPage_v]} />
    </Card>
    <Card className={`card2`} left={0}>
      <SeihekiShow data={seiheki_data[currentPage_v]} />
    </Card>
  </div>

  <div class="header" style="z-index: 2;">
    <div
      class="header-item"
      on:click={() => {
        currentPage.set(currentPage_v - 1);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" /></svg
      ><span>上一个</span>
    </div>

    <div class="header-item">{`${score_sum}分`}</div>

    <div class="header-item">
      {`${currentPage_v + 1} / ${seiheki_data.length}`}
    </div>
  </div>
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
    background-color: aquamarine;
  }
</style>
