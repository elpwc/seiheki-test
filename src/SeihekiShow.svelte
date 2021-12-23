<script lang="ts">
  import type Seiheki from './objects/seiheki';
  import { SeihekiBuilder } from './objects/seiheki';
  export let data: Seiheki | undefined = SeihekiBuilder('', 0, 0);
  export let color: string = '';
  import { currentSeihekiPage_s, winHeight_s, winWidth_s, device, seiheki_data, scoreSum_s } from './stores';

  let currentSeihekiPage: number = 0;
  currentSeihekiPage_s.subscribe((v) => {
    currentSeihekiPage = v;
  });

  const button_text: string[][] = [[], ['不能接受', '接受 or 喜欢'], ['不能接受', '接受', '喜欢'], ['不能接受', '无所谓', '接受', '喜欢'], ['不能接受', '无所谓', '接受', '喜欢']];

  const btn_onclick = (i: number) => {
    scoreSum_s.update((n) => n + i + 1);
    if (currentSeihekiPage < seiheki_data.length - 1) currentSeihekiPage_s.set(currentSeihekiPage + 1);
  };
</script>

<div class="box">
  <p class="title" style={`font-size: ${~~(440 / (8 + 3 * data?.title.length)) * 3}px`}>{data?.title}</p>
  <p class="quote-p">
    {#if data?.description !== ''}
      <span class="quote">“</span>
      <span class="desc">{data?.description}</span>
      <span class="quote">„</span>
    {/if}
  </p>
  <div class="bottomdiv" style={device === 'desktop' ? 'padding: 0 35%' : ''}>
    <div class="btnlist">
      {#each new Array(data?.score + 1) as _, i}
        <button
          class="selectbtn"
          style={`color: ${color};`}
          on:click={() => {
            btn_onclick(i);
          }}>{button_text[data?.score][i]}</button
        >
      {/each}
    </div>
  </div>
</div>

<style>
  .quote {
    font-size: 200%;
    margin: 0 10px;
    font-family: 'Times New Roman', Times, serif;
  }
  .desc {
    font-style: italic;
  }
  .box {
    width: 100%;
    height: 100%;
  }
  .title {
    width: 100%;
    margin-top: 15%;
    font-weight: bold;
    margin-bottom: 0;
  }
  .bottomdiv {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45%;
  }
  .btnlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }
  .selectbtn {
    margin: 5px 10px;
    background-color: white;
    font-weight: bold;
    font-size: 30px;
    border: none;
    border-radius: 5px;
    /*color: rgb(71, 201, 158);*/
    transition: 200ms;
    width: 95%;
  }

  @media (any-hover: hover) {
    .selectbtn:hover {
      color: rgb(99, 236, 190);
      width: 105%;
    }
  }

  .selectbtn:active {
    width: 90%;
  }
  .quote-p {
    margin-top: 0;
  }
</style>
