// import { resolve } from 'node:path'
// import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import { viteMockServe } from 'vite-plugin-mock'
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

// export default defineConfig(({ command }) => {
//     // 根据命令判断是开发还是生产环境
//     const isDev = command === 'serve'
//
//     return {
//         plugins: [
//             react(),
//             viteMockServe({
//                 // mock文件夹路径
//                 mockPath: 'mock',
//                 // 开发环境启用，生产环境关闭
//                 localEnabled: isDev,
//                 // 生产环境关闭
//                 prodEnabled: false,
//                 // 启用 TypeScript 支持
//                 supportTs: true,
//                 // 监视mock文件夹内文件变化
//                 watchFiles: true,
//                 // 打印日志
//                 logger: true,
//                 // 忽略直接引入mock的文件，避免热更新出错
//                 ignore: /^_/,
//                 // 覆盖原始请求结果
//                 injectCode: `
//           import { setupProdMockServer } from './mock/_mockProdServer';
//           setupProdMockServer();
//         `,
//             }),
//         ],
//         base: './', // 确保相对路径引用
//         build: {
//             outDir: 'dist',
//         },
//         server: {
//             host: '127.0.0.1',
//         },
//         resolve: {
//             alias: {
//                 '@': resolve(__dirname, 'src'),
//             },
//         },
//     }
// })
