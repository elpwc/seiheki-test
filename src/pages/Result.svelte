<!--
  结果展示页
  Author: wniko
-->
<script lang="ts">
  import { isPlainObject } from 'lodash';

  import { afterUpdate, onMount } from 'svelte';
  import Button from '../components/Button.svelte';
  import Rank from '../components/Rank.svelte';
  import { selectedSeihekis } from '../globals';
  import { scoreSum_s } from '../stores';
  import { addRecord, getRecords } from '../utils/api';
  import UserRecord, { UserRecordBuilder } from '../utils/record';
  import Utils from '../utils/utils';
  import InputName from './modals/InputNameModal.svelte';

  let scoreSum = 0;
  let shown_scoreSum = 0;

  let isNameInputed = false;

  let selected: Types.SelectedSeiheki[] = selectedSeihekis;

  let name: string = '';

  let userRecords: UserRecord[] = [];

  scoreSum_s.subscribe((v) => {
    scoreSum = v;
  });

  let inputNameModalVisibility: boolean = false;

  const refreshRank = async () => {
    const res = await getRecords({});
    if (res) {
      userRecords = res;
    }
  };

  onMount(async () => {
    inputNameModalVisibility = true;

    refreshRank();
  });

  const onInputNameModalOk = async (value: string) => {
    inputNameModalVisibility = false;
    if (value) {
      name = value;
    } else {
      name = '无名氏';
    }

    const geo_info: Types.GetIPPositionReturn = Utils.get_ip_position();

    const res = await addRecord(UserRecordBuilder(name, scoreSum, geo_info.cip, geo_info.cname));

    refreshRank();
  };

  const onSeeSetuClick = () => {};
</script>

<div>
  <InputName
    onOK={onInputNameModalOk}
    afterClose={() => {
      isNameInputed = true;
      for (let i = 0; i <= scoreSum; i++) {
        ((a) => {
          setTimeout(() => {
            shown_scoreSum = i;
          }, ~~(i ** 2.114514));
        })(i);
      }
    }}
    {inputNameModalVisibility}
  />

  <div>
    <p>你的XP指数为...</p>
    <p class="score">
      {isNameInputed ? shown_scoreSum : '待公布'}
    </p>
    <p>击败了{'114%'}的人()</p>
  </div>

  <p>根据你的喜好，为你准备了一些涩图，请点击下面查看</p>
  <Button on:click={onSeeSetuClick}>查看</Button>

  <div>
    <Rank {userRecords} />
  </div>
</div>

<style>
  .score {
    font-size: 5em;
    font-weight: bold;
  }
</style>
