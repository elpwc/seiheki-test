import axios from 'axios';

/**
 * 功能性方法
 */
export default class Utils {
  /**
   * 获取罗马数字
   * @param num 原数字，一个整数
   * @returns 对应的罗马数字
   */
  static convert_to_rome = (num: number) => {
    let ans = '';
    const k = Math.floor(num / 1000);
    let h = Math.floor((num % 1000) / 100);
    let t = Math.floor((num % 100) / 10);
    let o = num % 10;
    const one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    const ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
    const hundred = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
    const thousand = 'M';
    for (let i = 0; i < k; i++) {
      ans += thousand;
    }
    if (h) ans += hundred[h - 1];
    if (t) ans += ten[t - 1];
    if (o) ans += one[o - 1];
    return ans;
  };

  /**
   * 获取一个涩图对象
   * @param tag Tag
   * @param r18 0: Non-R18, 1: R18, 2: Mix
   * @param size 多个尺寸
   * @returns 返回一个Promise对象
   * @author wniko
   */
  static get_setu = async (tag: string, r18: 0 | 1 | 2 = 1, size: ('original' | 'regular' | 'small' | 'thumb' | 'mini')[] = ['original']) => {
    return new Promise((resolve: (value: Types.Setu) => void, reject: (reason?: any) => void) => {
      // let httpRequest = new XMLHttpRequest();

      /**
       * 发送请求图片url对象
       * @param tag
       * @param r18 0 nor18 2混合 1r18
       */
      /*
      const sendImageURLRequest = (tag: string, r18: number = 1, size: ('original' | 'regular' | 'small' | 'thumb' | 'mini')[] = ['original']) => {
        httpRequest.open('POST', './get_img_url.php', true);
        httpRequest.setRequestHeader('Content-type', 'application/json');
        httpRequest.send(
          JSON.stringify({
            tag: tag || '贫乳',
            r18: r18 || 1,
            size: size || ['original'],
          })
        );
      };

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          const res = JSON.parse(JSON.parse(httpRequest.responseText).data);
          //console.log('result: ', res);
          resolve(res);
          httpRequest = null;
        }
      };
*/
      axios
        .post('./get_img_url.php', {
          tag: tag || '贫乳',
          r18: r18 || 1,
          size: size || ['original'],
        })
        .then((res) => {
          resolve(res?.data?.data?.data?.[0]);
        });

      //sendImageURLRequest(tag, r18, size);
    });
  };

  /**
   * 获取IP和地址
   * @returns
   * @author wniko
   */
  static get_ip_position = (): Types.GetIPPositionReturn => {
    // @ts-ignore
    const value = returnCitySN;
    if (value) {
      return value as Types.GetIPPositionReturn;
    }
  };
}
