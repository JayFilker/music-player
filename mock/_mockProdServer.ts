import { createProdMockServer } from 'vite-plugin-mock/dist/createProdMockServer'

import productsMock from './modules/products'
// 导入所有模块
import userMock from './modules/user'

export function setupProdMockServer() {
    createProdMockServer([
        ...userMock,
        ...productsMock,
        // 添加更多模块
    ])
}
