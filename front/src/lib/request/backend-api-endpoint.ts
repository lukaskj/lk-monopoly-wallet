import { Config } from "$lib/config";
import { isNullOrUndefined } from "../helpers/is-null-or-undefined";
import type { AnyType } from "../types";

export function backendApiEndpoint(endpoint: string, params?: Record<string, AnyType>): string {
  if (Config.apiBaseUrl[Config.apiBaseUrl.length - 1] !== "/" && endpoint[0] !== "/") {
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
  return Config.apiBaseUrl + endpoint + queryParams;
}
