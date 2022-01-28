<script lang="ts">
  import type UserRecord from '../utils/record';

  export let userRecords: UserRecord[];
</script>

<div class="rank">
  <div class="ranktitle">排行榜</div>
  <div class="ranklist">
    {#each userRecords as record, index}
      <div class="rankitem">
        <div>{index + 1}</div>
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
  }

  .rankitem {
    border-bottom: solid 1px gray;
    padding: 3px 3px;
    display: flex;
    justify-content: space-between;
  }
</style>
