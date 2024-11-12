import { defineConfig } from "tsup";

export default defineConfig({
  bundle: true,
  clean: true, // rimraf disr
  dts: false, // generate dts file for main module
  entry: {
    server: "server.ts",
  },

  external: [],
  noExternal: [],
  format: ["esm"], // generate cjs and esm files
  minify: false,
  outDir: "dist",
  skipNodeModulesBundle: true,
  sourcemap: true, // source map is only available in prod
  // splitting: true,
  treeshake: true,
  target: "node22",
  cjsInterop: true,
});
