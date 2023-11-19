/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from "class-transformer";
import { PaginatedData } from "../dto";
import { isNullOrUndefined } from "../helpers/is-null-or-undefined";
import { Notification } from "../notification";
import { StatusCodes } from "../status-codes";
import type { AnyType, ClassConstructor } from "../types";

type TRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TErrorResponse = {
  message: string | string[];
  statusCode: number;
  error?: string;
};

type FetchType = typeof fetch;

export class ApiProxy {
  private static fetch: FetchType;
  protected _endpoint!: string;
  private _body: BodyInit | null = null;
  private queryParams?: Record<string, AnyType>;
  private headers: Record<string, string> = {};
  private defaultHeaders: Record<string, string> = { "Content-Type": "application/json" };
  protected _method: TRequestMethod = "GET";

  constructor() {}

  public static setFetch(fetch: FetchType): void {
    if (isNullOrUndefined(this.fetch)) {
      this.fetch = fetch;
    }
  }

  public endpoint(endpoint: string, queryParams?: Record<string, AnyType>): this {
    this._endpoint = endpoint;
    this.queryParams = queryParams;
    return this;
  }

  public setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  public method(method: TRequestMethod): this {
    this._method = method;
    return this;
  }

  public body<T>(body: T): this {
    this._body = JSON.stringify(body);
    return this;
  }

  private async execute<T>(transformTo?: ClassConstructor<T>): Promise<T> {
    // const url = backendApiEndpoint(this._endpoint, this.queryParams);
    // console.info(`Executing ${this._method} request: ${url}`);

    const body = {
      endpoint: this._endpoint,
      queryParams: this.queryParams,
      body: this._body,
      method: this._method,
      headers: {
        ...this.defaultHeaders,
        ...this.headers,
      },
    };

    const requestParams: RequestInit = {
      method: "POST",
      headers: {
        ...this.defaultHeaders,
      },
    };

    if (!isNullOrUndefined(this._body)) {
      requestParams.body = this._body;
    }

    requestParams.body = JSON.stringify(body);

    const response = await ApiProxy.fetch("/api", requestParams);

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
    limit: number = 200,
    transformTo?: ClassConstructor<T>,
  ): Promise<PaginatedData<T>> {
    this.queryParams = { ...this.queryParams, page, limit };
    const response = await this.execute(PaginatedData<T>);
    if (!isNullOrUndefined(transformTo)) {
      response.data = [...plainToInstance(transformTo, response.data)];
    }
    return response;
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

  public doNotRedirectToLoginOnForbidden(): this {
    return this;
  }
}
