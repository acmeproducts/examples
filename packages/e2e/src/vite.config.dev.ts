import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { existsSync } from "node:fs";

// In this monorepo, some demos pin newer versions of packages (e.g. three,
// postprocessing) that also exist at the root node_modules as older versions.
// Vite's esbuild pre-bundler can pull in both, creating duplicate class
// instances that crash at runtime. To prevent this, we alias any package that
// has a local copy in the demo's own node_modules so all imports resolve there.
const localAliases: Record<string, string> = {};
for (const pkg of ["three", "postprocessing"]) {
  const local = resolve(process.cwd(), "node_modules", pkg);
  if (existsSync(local)) {
    localAliases[pkg] = local;
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
      ...localAliases,
    },
  },
});
