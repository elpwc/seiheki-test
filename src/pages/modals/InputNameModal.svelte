<!--
  输入名字上传至排行榜
  Author: wniko
  Date: 2022-1-28
-->
<script lang="ts">
  import Modal from '../../components/Modal.svelte';

  export let onOK: (value: string, real: boolean) => void = () => {};
  export let inputNameModalVisibility: boolean = false;
  export let afterClose: () => void = () => {};

  let warningModalVisibility: boolean = false;
  let name: string = '';
  let checked: boolean;
</script>

<Modal
  width="60%"
  okButtonText="ok"
  showOkButton
  onOKButtonClick={() => {
    if (checked) {
      onOK(name, true);
    } else {
      warningModalVisibility = true;
    }
  }}
  visible={inputNameModalVisibility}
  onFlyOutEnd={afterClose}
  title="请输入名字，用于排行榜喵"
>
  <div style="padding: 15px 0;">
    <input bind:value={name} placeholder="不文明的词会被吃掉喵" /><br />
    <p style="display:flex; justify-content:center;">
      <label class="checkboxtext"><input type="checkbox" bind:checked />我是根据自己的真实认知进行选择的</label>
    </p>
  </div>
</Modal>

<Modal
  width="50%"
  showOkButton
  showCloseButton
  okButtonText="我已知晓"
  closeButtonText="返回勾选"
  visible={warningModalVisibility}
  onOKButtonClick={() => {
    warningModalVisibility = false;
    onOK(name, false);
  }}
  onCloseButtonClick={() => {
    warningModalVisibility = false;
  }}
>
  <p style="padding: 10px 0;">你没有勾选，得分不会计入排行榜</p>
</Modal>

<style>
  .checkboxtext {
    font-size: 0.9em;
    font-weight: bold;
    color: red;
  }
</style>
