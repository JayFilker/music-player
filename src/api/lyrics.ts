import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export async function getLyrics(artist: string, title: string) {
    try {
        // 注意：这个 API 是免费的但可能不稳定
        const response = await axios.get(
            `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
        )
        return response.data.lyrics
    }
    catch (error) {
        console.error('获取歌词失败:', error)
        return '歌词不可用'
    }
}

// 因歌词链接获取不稳定无法测试，因此并未使用以下配置而是直接使用链接
export function useLyrics(artist: any, title: any) {
    return useQuery({
        queryKey: ['album', artist, title], // 唯一标识这个查询的键
        queryFn: () => getLyrics(artist, title),
        enabled: !!artist && !!title, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
