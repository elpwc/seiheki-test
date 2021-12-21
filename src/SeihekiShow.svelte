<script lang="ts">
  import type Seiheki from './objects/seiheki';
  import { SeihekiBuilder } from './objects/seiheki';
  export let data: Seiheki = SeihekiBuilder('', 0, 0);

  import { currentPage, winHeight, winWidth, device } from './stores';

  let currentPage_v: number = 0;
  currentPage.subscribe((_) => {
    currentPage_v = _;
  });

  const button_text: string[][] = [[],
    ['不能接受', '接受 or 喜欢'],
    ['不能接受', '接受', '喜欢'],
    ['不能接受', '无所谓', '接受', '喜欢'],
    ['不能接受', '无所谓', '接受', '喜欢'],
  ];
</script>

<div class="box">

  <p class="title" style={`font-size: ${~~(440 / (8 + 3 * data.title.length))*3}px`}>{data.title}</p>
  <div class="bottomdiv" style={device === 'desktop'?'padding: 0 35%':''}>
    <div class="btnlist">
      {#each new Array(data.score + 1) as _, i}
        <button class='selectbtn'
          on:click={() => {
            currentPage.set(currentPage_v + 1);
          }}
        >{button_text[data.score][i]}</button>
      {/each}
    </div>
  </div>
</div>

<style>
  .box {
    width: 100%;
    height: 100%;
  }
  .title {
    width: 100%;
    margin-top: 15%;
    font-weight: bold;
  }
  .bottomdiv {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45%;
  }
  .btnlist {
    display: grid;
  }
  .selectbtn {
    margin: 5px 10px;
    background-color: white;
    font-weight: bold;
    font-size: 30px;
    border: none;
    border-radius: 5px;
    color: rgb(71, 201, 158);
  }
  .selectbtn:hover{
    color: rgb(96, 245, 195);
  }
</style>
