<script lang="ts">
  import Modal from '../../components/Modal.svelte';

  export let onContinue: () => void = () => {};
  export let onEnd: () => void = () => {};
  export let R18GWarnModalVisibility: boolean = false;
</script>

<Modal width="80%" title="⚠警告" okButtonText="继续" closeButtonText="立即结束" showOkButton showCloseButton onOKButtonClick={onContinue} onCloseButtonClick={onEnd} visible={R18GWarnModalVisibility}>
  <p>接下来出现的xp多是一些常人难以接受的<b>G级xp</b>，请确认是否要继续测试</p>
  <p>如果不能接受任何g级xp，请选择"立即结束"，会直接跳转到结果页</p>
</Modal>

<style></style>
