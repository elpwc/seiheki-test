/**
 * stores
 * @author wniko
 */
import { writable, readable, Readable, Writable } from 'svelte/store';

/** 当前页面 */
export let currentPage_s: Writable<'' | 'home' | 'select' | 'complete' | 'random'> = writable('home'); //home about select complete
/** 当前性癖 */
export let currentSeihekiPage_s: Writable<number> = writable(-1);
/** 窗口高度 */
export let winHeight_s = writable(0);
/** 窗口宽度 */
export let winWidth_s = writable(0);
/** 当前分数 */
export let scoreSum_s = writable(0);
