import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      // packages/types ships raw TypeScript. Aliasing to the source file keeps
      // it inside Vite's transform pipeline instead of the node_modules symlink,
      // where the runtime exports (can, isAdminRole, …) would arrive untranspiled.
      '@jaxongirman/types': path.resolve(import.meta.dirname, './packages/types/src/index.ts'),
    },
  },
})
