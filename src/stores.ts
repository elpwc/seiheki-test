import { writable, readable, Readable, Writable } from "svelte/store";
import type Item from './objects/item';

export let currentPage: Writable<number> = writable(0);
export let winHeight = writable(0);
export let winWidth = writable(0);

const level1: string[] = ['abc', 'cde', 'def'];
const level2: string[] = ['114', '514', '1919'];

export const lists: Readable<string[][]> = readable( [level1, level2
]);



