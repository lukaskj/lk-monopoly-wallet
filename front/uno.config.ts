/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetIcons({
      prefix: "",
      scale: 1.4,
      collections: {
        icon: () => import("@iconify-json/mdi/icons.json").then((i) => i.default as any),
      },
    }),
  ],
  // ...UnoCSS options
});
