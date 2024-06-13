import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'scrivito-icon-editor',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'scrivito'],
      output: {
        globals: {
          'react-dom': 'ReactDOM',
          react: 'React',
          scrivito: 'Scrivito',
        },
      },
    },
  },
})
