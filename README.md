# seiheki-test

<img src="./public/favicon.png" alt="logo" width="10%">

**XP系统测试器 / あなたの性癖レベルを測ろう**  
  
开发中 · Under developping  
Developped with Svelte

*XP数据位于 /src/data/ 文件夹内，欢迎发 Issue 或 PullRequest 补充性癖~()*

## 📕 对采用的性癖 level 的说明

| 等级 | 标题  | 说明                                                                            | 举例                                                                             |
| :--- | :---- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| 1    | 人类  | 被广泛接受，随便一位年上亲戚说不定也喜欢的程度的 xp                             | 头发, 道具, 乳, 手, 口, etc                                                      |
| 2    | 勇者  | 在社会上部分存在，但会被部分庶民评价为变态的程度的 xp                           | 足, 肛, 强奸, NTR, 尿道, 捆绑, etc                                               |
| 3    | 魔王  | 现实中几乎没有，在常人看来触犯法律/违背伦理/非常怪异但还不至于 guro 的程度的 xp | 兽奸, 药, 幼奸, 虫, 孕妇, etc                                                    |
| 4    | 深渊  | 不过包含了些轻度+中度 guro 成分在内的程度的 xp，想必对大家也是小菜一碟吧        | <details><summary>已折叠 点击展开</summary>欠损, 虐腹, 穿刺, 自残, etc</details> |
| 5    | ????? | 包含了重度 Guro，几乎让任何一个人都会感到恶心的程度的 xp                        | <details><summary>已折叠 点击展开</summary>食粪, 烹饪, 肢解, 斩首, etc</details> |

## 🚀 开发目标

1. 完成测试后，提示 xp 指数，并且根据最喜欢的部分 xp 从 pixiv 拉取相关 tag 的涩图显示()
2. 分数存入数据库，对比显示排名（？？？？好怪喔

## 🚩 初期预览

![alt 开发中的预览-home](./readme/home.png)
![alt 开发中的预览-select](./readme/ntr.png)

## 💖 致谢

在现有的 Pixiv API 因为官方更新已经完全不可用的状况下，感谢神代綺凛 ([@Tsuk1ko](https://github.com/Tsuk1ko)) さん的 [Lolicon API](https://api.lolicon.app/) , 为咱提供了 Pixiv 涩图拉取~
