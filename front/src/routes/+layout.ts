import "reflect-metadata";
import { ApiProxy } from "$lib/request/api-proxy";
import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch }) => {
  ApiProxy.setFetch(fetch);
  return {};
}) satisfies LayoutLoad;
