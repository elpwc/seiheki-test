<!--
  输入名字上传至排行榜
  Author: wniko
  Date: 2022-1-28
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from '../../components/Modal.svelte';
  import Rank from '../../components/Rank.svelte';
  import { getRecords } from '../../utils/api';
  import type UserRecord from '../../utils/record';

  export let onOK: () => void = () => {};
  export let rankModalVisibility: boolean = false;

  let userRecords: UserRecord[] = [];

  onMount(async () => {
    const res = await getRecords({ realType: 1 });
    if (res) {
      userRecords = res;
    }
  });
</script>

<Modal
  width="95%"
  okButtonText="已阅"
  showOkButton
  onOKButtonClick={() => {
    onOK();
  }}
  visible={rankModalVisibility}
>
  <Rank {userRecords} />
</Modal>

<style>
</style>
