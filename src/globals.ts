/**
 * 全局变量
 * @author wniko
 */
import type Level from './utils/level';
import type Seiheki from './utils/seiheki';

/** 做出的选项 */
export let selectedSeihekis: Types.SelectedSeiheki[] = []; // seiheki, score, selected score

/** 性癖集合 */
export let seiheki_data: Seiheki[] = [];
/** 性癖等级集合 */
export let level_data: Level[] = [];

/** 设备 */
export const device: string = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
