<script lang="ts">
  const httpRequest = new XMLHttpRequest();

  /**
   * 发送请求图片url对象
   * @param tag
   * @param setu 0 nor18 1混合 2r18
   */
  const sendImageURLRequest = (tag: string, setu: number = 2) => {
    httpRequest.open('POST', './get_img_url.php', true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(`tag=${tag ?? '贫乳'},setu=${setu ?? 2}`);
  };

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const res = JSON.parse(JSON.parse(httpRequest.responseText).data);
      
      console.log('result: ', res);
    }
  };

  sendImageURLRequest('足');
</script>

<div>结果页 展示分数+相关tag的pixiv涩图 待制作</div>

<style>
</style>
