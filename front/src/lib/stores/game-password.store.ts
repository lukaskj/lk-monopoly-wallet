import { writable, type Writable } from "svelte/store";

type TGamePassword = {
  [key: number]: string | undefined;
};

export const gamePasswordStore: Writable<TGamePassword> = writable({});
