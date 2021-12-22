import { writable, readable, Readable, Writable } from 'svelte/store';
import type Seiheki from './objects/seiheki';

export let currentPage_s: Writable<string> = writable('home'); //home about select complete
export let currentSeihekiPage_s: Writable<number> = writable(0);
export let winHeight_s = writable(0);
export let winWidth_s = writable(0);

export let selected: [number, number] = [0, 0]; // score, selected score
export let score_sum: number = 0;
export let seiheki_data: Seiheki[] = [];

export const device: string = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
