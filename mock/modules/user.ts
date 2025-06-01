import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

export default [
    {
        url: '/api/user/list',
        method: 'get',
        response: (req) => {
            const { page = 1, pageSize = 10 } = req.query

            const list = []
            const count = pageSize

            for (let i = 0; i < count; i++) {
                list.push({
                    id: Random.id(),
                    name: Random.cname(),
                    email: Random.email(),
                    avatar: Random.image('100x100'),
                    createTime: Random.datetime(),
                })
            }

            return {
                code: 200,
                message: 'ok',
                data: {
                    list,
                    pagination: {
                        total: 100,
                        page: Number(page),
                        pageSize: Number(pageSize),
                    },
                },
            }
        },
    },
    {
        url: '/api/user/login',
        method: 'post',
        timeout: 500, // 模拟网络延迟
        response: ({ body }) => {
            const { username, password } = body

            if (username === 'admin' && password === 'admin123') {
                return {
                    code: 200,
                    message: '登录成功',
                    data: {
                        token: `mock-token-${Random.string(32)}`,
                        userInfo: {
                            id: '1',
                            username: 'admin',
                            nickname: '管理员',
                            role: 'admin',
                        },
                    },
                }
            }

            return {
                code: 400,
                message: '用户名或密码错误',
            }
        },
    },
] as MockMethod[]
