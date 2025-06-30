// 具体业务请求
import { get } from './http.ts'

export function getArtistDetails(id: string) {
    return get(`/artists/${id}`)
}

export function getArtistSongs(id: string, market = 'US') {
    return get(`/artists/${id}/top-tracks`, { market })
}

export function getNewAlbums(id: string, country = 'US') {
    return get(`/artists/${id}/albums`, { include_groups: 'album,single', country })
}

export function getArtistAlbums(id: string) {
    return get(`/artists/${id}/albums`)
}

export function getArtistAlbum(artistId: string, limit = 1) {
    return get(`/artists/${artistId}/albums`, { limit, include_groups: 'album,single' })
}

export function searchArtist(artistName: string, limit = 10) {
    return get('/search', { q: artistName, type: 'artist', limit })
}
