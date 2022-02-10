<!--
  结果展示页
  Author: wniko
-->
<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import Button from '../components/Button.svelte';
  import Rank from '../components/Rank.svelte';
  import { selectedSeihekis } from '../globals';
  import { currentPage_s, scoreSum_s } from '../stores';
  import { addRecord, getRecords } from '../utils/api';
  import UserRecord, { UserRecordBuilder } from '../utils/record';
  import Utils from '../utils/utils';
  import InputName from './modals/InputNameModal.svelte';

  /** IP地理信息 */
  const geo_info: Types.GetIPPositionReturn = Utils.get_ip_position();
  /** 总分 */
  let scoreSum = 0;
  /** 显示的总分，因为要呈现逐步增加的效果 */
  let shown_scoreSum = 0;
  /** 是否已经累加完毕 */
  let add_done = false;
  /** 时候已经输入名字，用来控制得分版是否显示"待公布" */
  let isNameInputed = false;
  /** 选中的所有选项记录 */
  let selected: Types.SelectedSeiheki[] = selectedSeihekis;
  /** 输入的名字 */
  let name: string = '';
  /** 排行榜数据 */
  let userRecords: UserRecord[] = [];

  scoreSum_s.subscribe((v) => {
    scoreSum = v;
  });

  let inputNameModalVisibility: boolean = false;

  /** 刷新排行榜数据 */
  const refreshRank = async () => {
    const res = await getRecords({ realType: 1 });
    if (res) {
      // 去掉php错误返回
      if (typeof userRecords?.[0] !== 'object') {
        userRecords = [];
      } else {
        userRecords = res;
      }
    }
  };

  onMount(async () => {
    // 进入结果页后先显示姓名输入框
    inputNameModalVisibility = true;

    refreshRank();
  });

  const onInputNameModalOk = async (value: string, real: boolean) => {
    inputNameModalVisibility = false;
    if (value) {
      name = value;
    } else {
      // 设置未输入时的默认名字
      name = '无名氏';
    }
    // 添加记录
    const res = await addRecord(UserRecordBuilder(name, scoreSum, geo_info.cip, geo_info.cname, real));
    // 更新排行榜
    refreshRank();
  };

  const onSeeSetuClick = () => {};
</script>

<div class="resultPageContainer" style="height: {window.innerHeight}px;">
  <!--名字输入框-->
  <InputName
    onOK={onInputNameModalOk}
    afterClose={() => {
      // 填完名字后开始递增分数
      isNameInputed = true;
      for (let i = 0; i <= scoreSum; i++) {
        ((a) => {
          setTimeout(() => {
            shown_scoreSum = i;

            if (shown_scoreSum === scoreSum) {
              add_done = true;
              setTimeout(() => {
                add_done = false;
              }, 100);
            }
          }, ~~(i ** 1.14514));
        })(i);
      }
    }}
    {inputNameModalVisibility}
  />

  <!--结果展示-->
  <div>
    <p class="title">你的总计XP分数为...</p>
    <!--得分-->
    <div class="score_container">
      <p class="score">
        {isNameInputed ? shown_scoreSum : '待公布'}
      </p>
      {#if add_done}
        <p class="score_fade" out:scale={{ duration: 3000, start: 3 }}>
          {isNameInputed ? shown_scoreSum : '待公布'}
        </p>
      {/if}
    </div>
    <p class="title">
      超过了{(() => {
        let rank = userRecords.length;
        userRecords?.filter?.((record, index) => {
          rank = index;
          return record.ip === geo_info.cip;
        })?.[0];
        return (rank / userRecords.length) * 100.0;
      })()}%的人()
    </p>
  </div>

  <!--
    TODO:
    显示 段位，还有hentai等级(根据选择的高等级的xp的占比)

  -->

  <!--个性化涩图-->
  <p>根据你的喜好，为你准备了一些涩图</p>
  <Button on:click={onSeeSetuClick}>查看涩图</Button>
  <Button
    on:click={() => {
      currentPage_s.set('home');
    }}>返回主页</Button
  >

  <!--排行榜-->
  <div>
    <Rank {userRecords} height="fit-content" />
  </div>
</div>

<style>
  .score_container {
    height: 100px;
  }
  .score {
    font-size: 5em;
    font-weight: bold;
    margin: 0;
    width: 100%;
    position: absolute;
  }
  .score_fade {
    font-size: 5em;
    font-weight: bold;
    margin: 0;
    width: 100%;
    position: absolute;
  }
  .resultPageContainer {
    overflow-y: scroll;
  }
  .title {
    font-size: 1.5em;
  }
</style>
