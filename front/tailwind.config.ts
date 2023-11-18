import { join } from "path";
import type { Config } from "tailwindcss";
import tailwindcss_forms from "@tailwindcss/forms";

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin";
import { MainTheme } from "./themes/main-theme";

/** @type {import('tailwindcss').Config}*/
const config = {
  darkMode: "class",

  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
  ],

  theme: {
    extend: {},
  },

  plugins: [
    tailwindcss_forms,
    skeleton({
      themes: {
        preset: ["skeleton", "hamlindigo", "modern"],
        custom: [MainTheme],
      },
    }),
  ],
} satisfies Config;

export default config;
