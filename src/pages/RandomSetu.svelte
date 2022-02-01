<!--
  涩图tag搜索
  Author: wniko
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../components/Button.svelte';
  import Modal from '../components/Modal.svelte';
  import Svg from '../components/Svg.svelte';
  import { currentPage_s } from '../stores';
  import Utils from '../utils/utils';

  /** 显示的涩图对象 */
  let image: Types.Setu | undefined = undefined;
  /** 输入框中的tags */
  let tags: string = '贫乳,足';
  /** r18类型 0：R15 1:R18 0:Mix */
  let r18type: 0 | 1 | 2 = 0;

  /** 查看原图Modal可见性 */
  let originalImgModalBisivility: boolean = false;

  /** 加载预览图片的状态 */
  let imageLoadState: 'free' | 'wait' | 'loading' | 'complete' | 'error' | 'notfound' = 'free';
  /** 原图Modal里加载原图的状态 */
  let oriImageLoadState: 'free' | 'wait' | 'loading' | 'complete' | 'error' | 'notfound' = 'free';

  /** 根据tags刷新图片 */
  const refreshImage = async () => {
    imageLoadState = 'wait';
    const images: Types.Setu[] = await Utils.get_setu(tags.replaceAll('，', ',').split(','), r18type, ['small', 'original']);
    if (images) {
      if (images.length === 0) {
        imageLoadState = 'notfound';
      } else {
        image = images[0];
        imageLoadState = 'loading';
      }
    } else {
      imageLoadState = 'error';
    }
  };

  onMount(async () => {
    refreshImage();
  });
</script>

<div class="RandomSetuContainer">
  <Modal
    top="5%"
    width="90%"
    showOkButton
    title="请长按图片保存"
    visible={originalImgModalBisivility}
    onOKButtonClick={() => {
      originalImgModalBisivility = false;
      oriImageLoadState = 'free';
    }}
  >
    {#if oriImageLoadState === 'complete'}
      <a href={`https://www.pixiv.net/artworks/${image?.pid}`} target="_blank"
        >前往Pixiv查看
        <Svg name="link" />
      </a>
    {:else if oriImageLoadState === 'loading'}
      <p><Svg style="color: gray;" name="download" /> 原图加载中</p>
    {:else if oriImageLoadState === 'error'}
      <p>😣 图片加载失败，如果网络没问题大概是服务器炸了喵(</p>
      <p>方便的话进首页点进github页面发个issue反馈一下orz</p>
    {:else if oriImageLoadState === 'notfound'}
      <p>在图库里没有找到符合tag的图喵</p>
      <p />
    {/if}
    <div class="imgContainer" style={`height: ${window.innerHeight * 0.6}px;`}>
      <img
        on:load={() => {
          oriImageLoadState = 'complete';
        }}
        width="100%"
        src={originalImgModalBisivility && image?.urls.original}
        alt={image?.title}
      />
    </div>
  </Modal>
  <header>
    <button
      on:click={() => {
        currentPage_s.set('home');
      }}>返回主页</button
    >
    <input bind:value={tags} placeholder="这里输入xp,可用逗号隔开输入多个" />
    <button
      on:click={() => {
        refreshImage();
      }}>GET SETU</button
    >

    <div style="display:flex; justify-content:center; gap: 10px;">
      <label><input type="radio" bind:group={r18type} value={0} />R15</label>
      <label><input type="radio" bind:group={r18type} value={1} />R18 (NSFW)</label>
      <label><input type="radio" bind:group={r18type} value={2} />混合</label>
    </div>
    {#if imageLoadState === 'complete'}
      <div class="seeoriginal">
        <Button
          type="blue"
          style="border-radius: 20px; background-color: #3da7d8;"
          on:click={() => {
            originalImgModalBisivility = true;

            if (image) {
              oriImageLoadState = 'loading';
            } else {
              oriImageLoadState = 'error';
            }
          }}>查看原图</Button
        >
      </div>

      <p>{image?.title + ' - ' + image?.author}</p>
    {:else if imageLoadState === 'wait'}
      <p><Svg style="color: gray;" name="download" /> 搜索数据库中</p>
    {:else if imageLoadState === 'loading'}
      <p><Svg style="color: gray;" name="download" /> 图片加载中</p>
    {:else if imageLoadState === 'error'}
      <p>😣 图片加载失败，如果网络没问题大概是服务器炸了喵(</p>
      <p>方便的话进首页点进github页面发个issue反馈一下orz</p>
    {:else if imageLoadState === 'notfound'}
      <p>在图库里没有找到符合tag的图喵</p>
      <p />
    {/if}
  </header>

  <main>
    <img
      on:loadstart={() => {
        imageLoadState = 'loading';
      }}
      on:load={() => {
        imageLoadState = 'complete';
      }}
      on:error={() => {
        //imageLoadState = 'error';
      }}
      width="100%"
      src={image?.urls.small ?? ''}
      alt={image?.title}
    />
  </main>
</div>

<style>
  .RandomSetuContainer {
    margin-top: 5px;
    height: 100%;
    overflow-y: scroll;
  }
  .imgContainer {
    overflow-y: scroll;
  }
  header {
    position: sticky;
    background-color: whitesmoke;
    box-shadow: 0 0 5px 0 gray;
  }

  .seeoriginal {
    position: fixed;
    bottom: 10%;
    width: 100%;
  }
  p {
    margin: 0;
  }
</style>
