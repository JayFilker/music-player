import { useQuery } from '@tanstack/react-query'
import { get } from './http.ts'

export function fetchProfile(key: any): Promise<any> {
    const types = 'artist,album,track,playlist'
    const query = encodeURIComponent(key)
    return get(`/search?q=${query}&type=${types}&limit=20`)
}

export function useFetchProfile(key: any) {
    return useQuery({
        queryKey: ['fetchProfile', key], // 唯一标识这个查询的键
        queryFn: () => fetchProfile(key),
        enabled: !!key, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function firstFetchProfile(key: string, limit: number, type: string): Promise<any> {
    return get(`/search?q=label:"${key}"&type=${type}&limit=${limit}&market=JP`)
}

export function useFirstFetchProfile(key: any, limit: any, type: any) {
    return useQuery({
        queryKey: ['firstFetchProfile', key, limit, type], // 唯一标识这个查询的键
        queryFn: () => firstFetchProfile(key, limit, type),
        enabled: !!key && !!limit && !!type, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function recommendedArtists(randomTerm: any): Promise<any> {
    // 正确的API端点
    return get(`/search?q=${encodeURIComponent(randomTerm)}&type=artist&limit=6`)
}

export function useRecommendedArtists(randomTerm: any) {
    return useQuery({
        queryKey: ['recommendedArtists', randomTerm], // 唯一标识这个查询的键
        queryFn: () => recommendedArtists(randomTerm),
        enabled: !!randomTerm, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
