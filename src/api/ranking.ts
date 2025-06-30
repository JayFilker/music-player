import { useQuery } from '@tanstack/react-query'
import { get } from './http.ts'

export function fetchProfileByName(name: any): Promise<any> {
    // 按名称/标签搜索
    const encodedKey = encodeURIComponent(`label:"${name}"`)
    return get(`/search?q=${encodedKey}&type=playlist&limit=10`)
}

export function useFetchProfileByName(name: any) {
    return useQuery({
        queryKey: ['fetchProfileByName', name], // 唯一标识这个查询的键
        queryFn: () => fetchProfileByName(name),
        enabled: !!name, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function fetchProfileByNation(nation: any): Promise<any> {
    return get(`/search?q=label:"${nation}"&type=playlist&limit=10&market=${nation}`)
}

export function useFetchProfileByNation(nation: any) {
    return useQuery({
        queryKey: ['fetchProfileByNation', nation], // 唯一标识这个查询的键
        queryFn: () => fetchProfileByNation(nation),
        enabled: !!nation, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
