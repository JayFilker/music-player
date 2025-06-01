import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

export default [
    {
        url: '/api/products',
        method: 'get',
        response: () => {
            const products = []

            for (let i = 0; i < 20; i++) {
                products.push({
                    id: Random.id(),
                    name: Random.ctitle(5, 10),
                    price: Random.float(10, 1000, 2, 2),
                    category: Random.pick(['电子', '服装', '食品', '图书']),
                    description: Random.cparagraph(1, 3),
                    image: Random.image('200x200', Random.color(), '#fff', 'Mock Product'),
                    stock: Random.integer(0, 100),
                    createdAt: Random.datetime(),
                })
            }

            return {
                code: 200,
                message: 'success',
                data: products,
            }
        },
    },
    {
        url: '/api/products/:id',
        method: 'get',
        response: ({ params }) => {
            const { id } = params

            return {
                code: 200,
                message: 'success',
                data: {
                    id,
                    name: Random.ctitle(5, 10),
                    price: Random.float(10, 1000, 2, 2),
                    category: Random.pick(['电子', '服装', '食品', '图书']),
                    description: Random.cparagraph(3, 7),
                    images: Array.from({ length: 5 }).fill(0).map(() => Random.image('400x400')),
                    stock: Random.integer(0, 100),
                    rating: Random.float(0, 5, 0, 1),
                    createdAt: Random.datetime(),
                    updatedAt: Random.datetime(),
                },
            }
        },
    },
] as MockMethod[]
