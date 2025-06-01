// import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
        // basicSsl()
    ],
    base: './', // 确保相对路径引用
    build: {
        outDir: 'dist',
    },
    server: {
        host: '127.0.0.1',
    },
})
