<!--
  自定义按钮组件
  Author: wniko
-->
<script lang="ts">
  export let style: string = '';
</script>

<button class="mybutton" {style} on:click><slot /></button>

<style>
  .mybutton {
    background-color: white;
    border: 1px solid darkgray;
    width: 35vw;
    border-radius: 10px;
    transition: 0.2s;
  }
  @media (any-hover: hover) {
    .mybutton:hover {
      width: 37vw;
    }
  }
  .mybutton:active {
    background-color: gray;
    width: 33vw;
  }
</style>
