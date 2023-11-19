import { writable, type Writable } from "svelte/store";
import AppbarTrail from "../components/layout/appbar-trail.svelte";

export const appbarTrailStore: Writable<ConstructorOfATypedSvelteComponent | null> = writable(AppbarTrail);
