<!--
  关于Modal
  Author: wniko
  Date: 2022-1-28
-->
<script lang="ts">
  import { currentPage_s } from './../../stores';
  import Modal from '../../components/Modal.svelte';

  export let onClose: () => void = () => {};
  export let aboutModalVisibility: boolean = false;

  let closeClicked = false;
</script>

<Modal
  width="60%"
  title="说明"
  okButtonText="嗯()"
  closeButtonText="result test"
  showOkButton
  showCloseButton
  onOKButtonClick={onClose}
  onCloseButtonClick={() => {
    aboutModalVisibility = false;
    closeClicked = true;
  }}
  onFlyOutEnd={() => {
    if (closeClicked) {
      currentPage_s.set('complete');
    }
  }}
  visible={aboutModalVisibility}
>
  <p>懒得写东西 摸了</p>
  <p>具体请点进右边gayhub下拉看说明喵</p>
</Modal>

<style>
</style>
