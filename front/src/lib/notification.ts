import type { ToastSettings } from "@skeletonlabs/skeleton";
import { getToastStore } from "@skeletonlabs/skeleton";

type NotificationOptions = Omit<ToastSettings, "message">;
type NotificationOptionsNoBg = Omit<NotificationOptions, "background">;

const toastStore = getToastStore();
export class Notification {
  public static success(message: string | string[], options: NotificationOptionsNoBg = {}): string {
    return this.show(message, { background: "variant-filled-success", ...options });
  }

  public static error(message: string | string[], options: NotificationOptionsNoBg = {}): string {
    return this.show(message, { background: "variant-filled-error", ...options });
  }

  public static warning(message: string | string[], options: NotificationOptionsNoBg = {}): string {
    return this.show(message, { background: "variant-filled-warning", ...options });
  }

  public static show(message: string | string[], options: NotificationOptions = {}): string {
    const _message = Array.isArray(message) ? message.join("\n") : message;

    return toastStore.trigger({
      message: _message,
      hoverable: true,
      timeout: 5000,
      ...options,
    });
  }

  public static clear() {
    toastStore.clear();
  }
}
