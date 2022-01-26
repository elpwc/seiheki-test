<script lang="ts">
  let httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', './get_img.php', true);
  httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  httpRequest.send(JSON.stringify({ userid: '18240502' }));

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var json = httpRequest.responseText;
      console.log('result: ', json);
    }
  };

  /*
  import PixivApi from 'pixiv-api-client';
  const pixiv = new PixivApi({
    headers: {
      referer: 'http://www.pixiv.net',
    },
  });

  const word = 'ラブライブ';

  pixiv.refreshAccessToken('hNiSUA6mrio-q_nQT7QwajT59InYYumthYBqh41DgSA').then(() => {
    return pixiv
      .searchIllust(word)
      .then((json) => {
        console.log(json);
        return pixiv.requestUrl(json.next_url);
      })
      .then((json) => {
        console.log(json); //next results
      });
  });
  */
</script>

<div />

<style>
</style>
