import "reflect-metadata";
import { apiEndpoint } from "$lib/request/api-endpoint";
import type { AnyType } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ServerConfig } from "$lib/backend/server-config";

type TRequestData = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  queryParams?: Record<string, AnyType>;
  body?: BodyInit;
  headers?: HeadersInit;
};

export const POST: RequestHandler = async ({ request, fetch }) => {
  const requestData = (await request.json()) as TRequestData;
  const endpoint = requestData.endpoint;
  const method = requestData.method;
  const queryParams = requestData.queryParams;
  const body = requestData.body;
  const headers = requestData.headers;

  const fullUrl = apiEndpoint(ServerConfig.backendBaseUrl(), endpoint, queryParams);

  const response = await fetch(fullUrl, {
    method,
    body,
    headers,
  });

  return response;
  return json({}, { status: response.status, statusText: response.statusText });
};
