<script lang="ts">
  import type UserRecord from '../utils/record';

  export let userRecords: UserRecord[];
  export let height: string = `${window.innerHeight * 0.5}px`;
</script>

<div class="rank">
  <div class="ranktitle">排行榜</div>
  <div class="ranklist" style="height: {height};">
    {#each userRecords as record, index}
      <div class="rankitem">
        <div>
          <!--円div-->
          <div>{index + 1}</div>
        </div>
        <div>{record.score}点</div>
        <div>{record.name}</div>
        <div>{record.position}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .rank {
    margin: 5px;
    border: solid 1px gray;
    border-radius: 5px;
    background-color: white;
    font-size: 1.2em;
  }

  .ranktitle {
    background-color: lightgray;
    border-bottom: solid 1px gray;
    font-weight: bold;
    padding: 5px 0;
    position: sticky;
    top: 0;
  }

  .ranklist {
    overflow-y: scroll;
  }

  .rankitem {
    border-bottom: solid 1px gray;
    padding: 3px 3px;
    display: flex;
    justify-content: space-between;
  }

  .rankitem:nth-child(1) > div:first-child div {
    /* fisrt */
    background-color: #ebc600;
    color: white;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
  }

  .rankitem:nth-child(2) > div:first-child div {
    /* second */
    background-color: #c9c9c9;
    color: rgb(58, 58, 58);
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
  }

  .rankitem:nth-child(3) > div:first-child div {
    /* third */
    background-color: #c9560a;
    color: white;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
  }

  .rankitem > div:nth-child(1) {
    /* index */
    font-weight: bold;
  }

  .rankitem > div:nth-child(2) {
    /* score */
    font-weight: bold;
  }

  .rankitem > div:nth-child(3) {
    /* name */
    color: black;
  }

  .rankitem > div:nth-child(4) {
    /* position */
    color: gray;
  }
</style>
