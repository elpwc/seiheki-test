<script lang="ts">
  import type UserRecord from '../utils/record';

  export let userRecords: UserRecord[];
  export let height: string = `${window.innerHeight * 0.5}px`;
</script>

<div class="rank" style="height: {height};">
  <table class="ranklist">
    <caption>排行榜</caption>
    <thead class="ranktitle">
      <tr>
        <th>排行</th>
        <th>得点</th>
        <th>名字</th>
        <th>地区</th>
      </tr>
    </thead>

    <tbody class="">
      {#each userRecords as record, index}
        <tr class="rankitem">
          <td>
            <!--円div-->
            <div>{index + 1}</div>
          </td>
          <td>{record.score}点</td>
          <td>{record.name}</td>
          <td>{record.position}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .rank {
    margin: 5px;
    border: solid 1px gray;
    border-radius: 5px;
    background-color: white;
    font-size: 1.2em;
    overflow-y: scroll;
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
    width: 100%;
  }

  .rankitem:nth-child(1) > td:first-child div {
    /* fisrt */
    background-color: #ebc600;
    color: white;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
    margin: auto;
  }

  .rankitem:nth-child(2) > td:first-child div {
    /* second */
    background-color: #c9c9c9;
    color: rgb(58, 58, 58);
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
    margin: auto;
  }

  .rankitem:nth-child(3) > td:first-child div {
    /* third */
    background-color: #c9560a;
    color: white;
    width: 1.4em;
    height: 1.4em;
    border-radius: 0.7em;
    margin: auto;
  }

  .rankitem > td:nth-child(1) {
    /* index */
    font-weight: bold;
  }

  .rankitem > td:nth-child(2) {
    /* score */
    font-weight: bold;
  }

  .rankitem > td:nth-child(3) {
    /* name */
    color: black;
  }

  .rankitem > td:nth-child(4) {
    /* position */
    color: gray;
  }
</style>
