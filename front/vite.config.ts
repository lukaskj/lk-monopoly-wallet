/* eslint-disable @typescript-eslint/no-explicit-any */
import { sveltekit } from "@sveltejs/kit/vite";
import UnoCSS from "unocss/vite";
import { defineConfig, type UserConfig } from "vite";
// import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import {esbuildDecorators} from "@anatine/esbuild-decorators";

export default defineConfig({
  plugins: [
    sveltekit(),
    UnoCSS(),
  //   swc(
  //     defineRollupSwcOption({
  //       jsc: {
  //         baseUrl: "src/",
  //         parser: {
  //           syntax: "typescript",
  //           // tsx: true, // If you use react
  //           dynamicImport: true,
  //           decorators: true,
  //         },
  //         target: "esnext",
  //         transform: {
  //           legacyDecorator: true,
  //           decoratorMetadata: true,
  //         },
  //       },
  //     }),
  //   ),
  // ],
  // esbuild: false,
  // ----
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildDecorators({
          tsconfig: "./tsconfig.json",
        }),
      ],
    },
  },
}) satisfies UserConfig;
