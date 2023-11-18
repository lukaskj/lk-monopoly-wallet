/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetIcons({
      prefix: "",
      collections: {
        "icon": () => import("@iconify-json/game-icons/icons.json").then((i) => i.default as any),
      },
    }),
  ],
  // ...UnoCSS options
});
