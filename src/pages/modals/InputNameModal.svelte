<!--
  输入名字上传至排行榜
  Author: wniko
  Date: 2022-1-28
-->
<script lang="ts">
  import Modal from '../../components/Modal.svelte';

  export let onOK: (value: string) => void = () => {};
  export let inputNameModalVisibility: boolean = false;
  export let afterClose: () => void = () => {};

  let name: string = '';
</script>

<Modal
  width="60%"
  okButtonText="ok"
  showOkButton
  onOKButtonClick={() => {
    onOK(name);
  }}
  visible={inputNameModalVisibility}
  onFlyOutEnd={afterClose}
>
  <input bind:value={name} placeholder="请输入1个名字，用于排行榜喵" />
</Modal>

<style>
</style>
