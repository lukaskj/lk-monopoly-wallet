import { isNullOrUndefined } from "./is-null-or-undefined";

export interface FormValidationResponse {
  message: string;
  [key: string]: string;
}

type KFormValidationResponse<T> = keyof T;

export type TFormValidationResponse<T> = Record<KFormValidationResponse<T>, string>;

export function validateFormResponse(data: string | string[], formKeys?: string[]): FormValidationResponse {
  const result: FormValidationResponse = {
    message: "",
  };
  if (!Array.isArray(data)) {
    data = [data || ""];
  }

  if (!isNullOrUndefined(formKeys)) {
    for (const key of formKeys) {
      if (!result[key]) {
        result[key] = "";
      }
      for (const validation of data) {
        if (validation.indexOf(key) >= 0) {
          // result[key] += validation.substring(validation.indexOf(key) + key.length + 1, validation.length) + "\n";
          result[key] = validation.substring(validation.indexOf(key) + key.length + 1, validation.length);
        }
      }
    }
  } else {
    for (const validation of data) {
      const spaceIndex = validation.indexOf(" ");
      const key = validation.substring(0, spaceIndex);
      // if (!result[key]) result[key] = "";
      // result[key] += validation + "\n";
      result[key] = validation;
    }
  }

  return result;
}
