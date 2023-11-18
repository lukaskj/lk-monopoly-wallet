export type AnyType = number | string | boolean | null;

export interface AnyTypeObject {
  [key: string]: AnyType;
}

export type ClassConstructor<T> = { new (): T };
export type Self<T> = ClassConstructor<T>;

export interface DefaultResponseType {
  statusCode: number;
  message: string;
  error?: string;
}
