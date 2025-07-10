import { useQuery } from '@tanstack/react-query'
// 具体业务请求
import { get } from './http.ts'

export function getArtistDetails(id: string) {
    return get(`/artists/${id}`)
}

export function useArtistDetails(id: any) {
    return useQuery({
        queryKey: ['artistDetails', id], // 唯一标识这个查询的键
        queryFn: () => getArtistDetails(id),
        enabled: !!id, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function getArtistSongs(id: any, market = 'US') {
    return get(`/artists/${id}/top-tracks`, { market })
}

export function useArtistSongs(id: any) {
    return useQuery({
        queryKey: ['artistSongs', id], // 唯一标识这个查询的键
        queryFn: () => getArtistSongs(id),
        enabled: !!id, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function getNewAlbums(id: any, country = 'US') {
    return get(`/artists/${id}/albums`, { include_groups: 'album,single', country })
}

export function useNewAlbums(id: any, country = 'US') {
    return useQuery({
        queryKey: ['newAlbums', id], // 唯一标识这个查询的键
        queryFn: () => getNewAlbums(id, country),
        enabled: !!id, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function getArtistAlbums(id: any) {
    return get(`/artists/${id}/albums`)
}

export function useArtistAlbums(id: any) {
    return useQuery({
        queryKey: ['artistAlbums', id], // 唯一标识这个查询的键
        queryFn: () => getArtistAlbums(id),
        enabled: !!id, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function getArtistAlbum(artistId: any, limit = 1) {
    return get(`/artists/${artistId}/albums`, { limit, include_groups: 'album,single' })
}

export function useArtistAlbum(artistId: any, limit = 1) {
    return useQuery({
        queryKey: ['artistAlbum', artistId, limit], // 唯一标识这个查询的键
        queryFn: () => getArtistAlbum(artistId, limit),
        enabled: !!artistId, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function searchArtist(artistName: any, limit = 10) {
    return get('/search', { q: artistName, type: 'artist', limit })
}
export function useSearchArtist(artistName: any, limit = 10) {
    return useQuery({
        queryKey: ['searchArtist', artistName, limit], // 唯一标识这个查询的键
        queryFn: () => searchArtist(artistName, limit),
        enabled: !!artistName, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
