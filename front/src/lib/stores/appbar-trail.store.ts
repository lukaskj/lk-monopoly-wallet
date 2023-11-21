import { writable, type Writable } from "svelte/store";

export const appbarTrailStore: Writable<ConstructorOfATypedSvelteComponent | null> = writable(null);

export const appbarTrailParamsStore: Writable<unknown | null> = writable(null);
