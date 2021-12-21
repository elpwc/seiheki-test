import { writable, readable, Readable, Writable } from 'svelte/store';
import type Seiheki from './objects/seiheki';

export let currentPage: Writable<number> = writable(0);
export let winHeight = writable(0);
export let winWidth = writable(0);

export const device: string = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
