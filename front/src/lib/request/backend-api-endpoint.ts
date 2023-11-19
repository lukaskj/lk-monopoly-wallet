import { Config } from "$lib/config";
import type { AnyType } from "../types";
import { apiEndpoint } from "./api-endpoint";

export function backendApiEndpoint(endpoint: string, params?: Record<string, AnyType>): string {
  return apiEndpoint(Config.apiBaseUrl, endpoint, params);
}
