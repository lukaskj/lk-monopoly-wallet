import { isNullOrUndefined } from "$lib/helpers/is-null-or-undefined";
import type { AnyType } from "$lib/types";

export function apiEndpoint(baseUrl: string, endpoint: string, params?: Record<string, AnyType>): string {
  if (baseUrl[baseUrl.length - 1] !== "/" && endpoint[0] !== "/") {
    endpoint = "/" + endpoint;
  }

  const transformedParams: Record<string, string> = {};

  if (!isNullOrUndefined(params)) {
    for (const key of Object.keys(params)) {
      if (!isNullOrUndefined(params[key])) {
        transformedParams[key] = String(params[key]);
      }
    }
  }

  const queryParams = isNullOrUndefined(params) ? "" : "?" + new URLSearchParams(transformedParams);
  return baseUrl + endpoint + queryParams;
}
