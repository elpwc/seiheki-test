import { writable, readable, Readable, Writable } from 'svelte/store';
import type Level from './objects/level';
import type Seiheki from './objects/seiheki';

export let currentPage_s: Writable<string> = writable('home'); //home about select complete
export let currentSeihekiPage_s: Writable<number> = writable(-1);
export let winHeight_s = writable(0);
export let winWidth_s = writable(0);

export let scoreSum_s = writable(0);

export let selected: [string,number, number][] = []; // seiheki, score, selected score
export let seiheki_data: Seiheki[] = [];
export let level_data: Level[] = [];

export const device: string = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
