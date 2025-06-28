import axios, { type AxiosInstance } from 'axios'

// 创建带认证的 axios 实例
function createClient(): AxiosInstance {
    return axios.create({
        baseURL: 'https://api.spotify.com/v1',
        headers: {
            get 'Authorization'() {
                const token = localStorage.getItem('spotify_access_token')
                return token ? `Bearer ${token}` : ''
            },
            'Content-Type': 'application/json',
        },
    })
}

const client = createClient()

// // 创建带认证的 axios 实例
// function createClient(): AxiosInstance {
//     const instance = axios.create({
//         baseURL: 'https://api.spotify.com/v1',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//
//     // 添加请求拦截器，确保每次请求时都获取最新的 token
//     instance.interceptors.request.use((config) => {
//         const token = localStorage.getItem('spotify_token')
//         console.log('token', token)
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     })
//
//     return instance
// }
//
// const client = createClient()

// 公共请求函数
export async function get(url: string, params?: Record<string, any>) {
    const { data } = await client.get(url, { params })
    return data
}

export async function put(url: string, data?: any) {
    const response = await client.put(url, data)
    return response.data
}
