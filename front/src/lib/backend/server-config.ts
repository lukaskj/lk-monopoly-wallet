import { env } from "$env/dynamic/private";

export class ServerConfig {
  public static backendBaseUrl(): string {
    return env.BACKEND_BASE_URL;
  }
}
