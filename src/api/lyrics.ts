import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 创建环境变量或配置文件存储密钥
const API_KEY = 'hk267-2qqOUzXjzt4KZ6LgijLjj0Nl3N35550m0b'
const BASE_URL = 'https://api.happi.dev/v1'

const happiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: API_KEY,
    },
})

export async function searchMusic(query: string, limit = 10) {
    try {
        const response = await happiClient.get('/music', {
            params: {
                q: query,
                limit,
            },
        })
        return response.data
    }
    catch (error) {
        console.error('Error searching music:', error)
        throw error
    }
}

export function useSearchMusic(query: string) {
    return useQuery({
        queryKey: ['searchMusic', query], // 唯一标识这个查询的键
        queryFn: () => searchMusic(query),
        enabled: !!query, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export async function getLyricsByUrl(lyricsUrl: string) {
    try {
        // 注意：这里我们直接使用完整的 URL，而不是基础 URL + 路径
        const response = await axios.get(lyricsUrl, {
            params: {
                apikey: API_KEY,
            },
        })
        return response.data
    }
    catch (error) {
        console.error('Error fetching lyrics:', error)
        throw error
    }
}

export function useLyricsByUrl(lyricsUrl: string) {
    return useQuery({
        queryKey: ['lyricsByUrl', lyricsUrl], // 唯一标识这个查询的键
        queryFn: () => getLyricsByUrl(lyricsUrl),
        enabled: !!lyricsUrl, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
