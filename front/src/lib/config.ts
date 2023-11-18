// import { env } from "$env/dynamic/private";

export class Config {
  public static get apiBaseUrl(): string {
    return "http://localhost:3000/v1";
  }
}

// function returnOrThrow(key: string): string {
// 	const value = env[key];
// 	if (isNullOrUndefined(value)) {
// 		throw new Error(`Empty setting: ${key}`);
// 	}

// 	return value;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function returnOrThrowNumber(key: string): number {
// 	const value = parseInt(returnOrThrow(key));
// 	if (isNaN(value) || isNullOrUndefined(value)) {
// 		throw new Error(`Invalid env: '${key}'`);
// 	}

// 	return value;
// }
