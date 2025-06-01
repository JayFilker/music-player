/// <reference types="vite/client" />

// 为 vite-plugin-mock 添加类型声明
declare module 'vite-plugin-mock/dist/createProdMockServer' {
    import type { MockMethod } from 'vite-plugin-mock'

    export function createProdMockServer(mockList: MockMethod[]): void
}
