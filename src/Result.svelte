<script lang="ts">
  import PixivApi from 'pixiv-api-client';
  const pixiv = new PixivApi();

  const word = 'ラブライブ';
  pixiv.tokenRequest('code', 'codeVerfier').then(() => {
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
</script>

<div />

<style>
</style>
