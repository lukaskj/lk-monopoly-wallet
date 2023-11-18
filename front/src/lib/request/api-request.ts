/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from "class-transformer";
import { isNullOrUndefined } from "../helpers/is-null-or-undefined";
import { Notification } from "../notification";
import { StatusCodes } from "../status-codes";
import type { AnyType, ClassConstructor } from "../types";
import { backendApiEndpoint } from "./backend-api-endpoint";
import { PaginatedData } from "../dto";

type TRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TErrorResponse = {
  message: string | string[];
  statusCode: number;
  error?: string;
};

type FetchType = typeof fetch;

export class ApiRequest {
  protected fetch: FetchType;
  protected _endpoint!: string;
  private _body: BodyInit | null = null;
  private queryParams?: Record<string, AnyType>;
  private headers: Record<string, string> = {};
  private redirectToLoginOnForbidden: boolean = true;
  private defaultHeaders: Record<string, string> = { "Content-Type": "application/json" };
  protected _method: TRequestMethod = "GET";

  constructor(fetch: FetchType) {
    this.fetch = fetch;
  }

  public endpoint(endpoint: string, queryParams?: Record<string, AnyType>): ApiRequest {
    this._endpoint = endpoint;
    this.queryParams = queryParams;
    return this;
  }

  public setHeader(key: string, value: string): ApiRequest {
    this.headers[key] = value;
    return this;
  }

  public method(method: TRequestMethod): ApiRequest {
    this._method = method;
    return this;
  }

  public body<T>(body: T): ApiRequest {
    this._body = JSON.stringify(body);
    return this;
  }

  private async execute<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    const url = backendApiEndpoint(this._endpoint, this.queryParams);
    // console.info(`Executing ${this._method} request: ${url}`);

    const requestParams: RequestInit = {
      method: this._method,
      headers: {
        ...this.defaultHeaders,
        ...this.headers,
      },
    };

    if (!isNullOrUndefined(this._body)) {
      requestParams.body = this._body;
    }

    const response = await this.fetch(url, requestParams);

    const statusCode = response.status;

    if (statusCode === StatusCodes.FORBIDDEN || statusCode === StatusCodes.UNAUTHORIZED) {
      const json = (await response.json()) as { message?: string; statusCode: number };
      const message = json?.message || StatusCodes[statusCode].toString();

      Notification.error(message);

      return {} as T;
    }

    let json: any = { message: "Error" };
    let message = (json as any).message;

    try {
      json = (await response.json()) as T;
      message = (json as any).message;
    } catch (error) {
      console.error(error);
    }

    if (statusCode >= StatusCodes.BAD_REQUEST) {
      Notification.error(Array.isArray(message) ? message.join("<br/>") : message);
      throw json as TErrorResponse;
    }

    if (!isNullOrUndefined(transformTo)) {
      return plainToInstance(transformTo, json);
    }

    return json;
  }

  public async getPaginated<T>(
    page: number = 1,
    limit: number = 20,
    params?: Record<string, AnyType>,
  ): Promise<PaginatedData<T>> {
    this.queryParams = { ...this.queryParams, page, limit, ...params };
    return this.execute(PaginatedData<T>);
  }

  public async get<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    this._method = "GET";
    return await this.execute<T>(transformTo);
  }

  public async post<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    this._method = "POST";
    return await this.execute<T>(transformTo);
  }

  public async put<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    this._method = "PUT";
    return await this.execute<T>(transformTo);
  }

  public async delete<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    this._method = "DELETE";
    return await this.execute<T>(transformTo);
  }

  public doNotRedirectToLoginOnForbidden(): ApiRequest {
    this.redirectToLoginOnForbidden = false;
    return this;
  }
}
