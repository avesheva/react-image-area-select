import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: 'react-image-area-select',
      fileName: format => `react-image-area-select.${ format }.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  },
})
