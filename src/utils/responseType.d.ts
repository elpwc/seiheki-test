declare namespace Types {
  /**
   * 从服务器接收到的涩图对象
   */
  interface Setu {
    pid: number; //	作品 pid
    p: number; //	作品所在页
    uid: number; //	作者 uid
    title: string; //	作品标题
    author: string; //作者名（入库时，并过滤掉 @ 及其后内容）
    r18: boolean; //是否 R18（在库中的分类，不等同于作品本身的 R18 标识）
    width: number; //原图宽度 px
    height: number; //原图高度 px
    tags: string[]; //	作品标签，包含标签的中文翻译（有的话）
    ext: string; //	图片扩展名
    uploadDate: number; //	作品上传日期；时间戳，单位为毫秒
    urls: {
      original?: string;
      regular?: string;
      small?: string;
      thumb?: string;
      mini?: string;
    };
  }

  /**
   * 选中的性癖
   */
  interface SelectedSeiheki {
    seiheki: Seiheki;
    /** 选中的分值 */
    selectedScore: number;
  }

  /**
   * 获取记录GET参数
   */
  interface GetRecordsParams {
    count?: number;
    ip?: string;
    /**
     * 可信度
     * @description 0: all, 1: true, 2: false
     * */
    realType?: 0 | 1 | 2;
  }

  /**
   * 获取IP/地址结果
   */
  interface GetIPPositionReturn {
    /** IP */
    cip: string;
    /** 行政区划编码 */
    cid: string;
    /** 位置 */
    cname: string;
  }
}
