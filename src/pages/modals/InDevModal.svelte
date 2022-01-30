<!--
  开发中提示Modal
  Author: wniko
  Date: 2022-1-30
-->
<script lang="ts">
  import Modal from '../../components/Modal.svelte';
  import Svg from '../../components/Svg.svelte';

  export let onClose: () => void = () => {};
  export let inDevModalVisibility: boolean = false;
</script>

<Modal width="80%" title="🚧你已进入工地" okButtonText="承知" showOkButton onOKButtonClick={onClose} visible={inDevModalVisibility}>
  <p>
    喵！<br />XP测试处于开发阶段，功能尚不完善，在正式版公开前请不要传播捏<br />具体开发进度请到<a href="https://github.com/elpwc/seiheki-test" target="_blank">GitHub页 <Svg name="link" /> </a>查看喵
  </p>
</Modal>

<style>
  a {
    background-color: rgb(238, 238, 238);
    border-radius: 3px;
    padding: 0 3px;
  }
</style>
