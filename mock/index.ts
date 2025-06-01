import productsMock from './modules/products'
// 只需导出数组，vite-plugin-mock会自动处理
import userMock from './modules/user'

export default [
    ...userMock,
    ...productsMock,
    // 添加更多模块
]
