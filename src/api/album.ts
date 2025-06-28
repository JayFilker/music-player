import { get } from './http.ts'

export function getAlbumList(key: string, offset: number): Promise<any> {
    return get(`/search?q=${key}&type=album&limit=50&offset=${offset}`)
}

export function getAlbum(randomLetter: any): Promise<any> {
    return get(`/search?q=${randomLetter}&type=album&limit=1`)
}

export function getAlbumSong(albumId: any): Promise<any> {
    return get(`/albums/${albumId}/tracks?limit=10`)
}

// export async function getAlbumList(token: any, key: string, offset: number): Promise<any> {
//     const result = await axios.get(`https://api.spotify.com/v1/search?q=${key}&type=album&limit=50&offset=${offset}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
//     return result.data
// }

// export async function getAlbum(randomLetter: any, token: string): Promise<any> {
//     const searchResponse = await axios.get(
//         `https://api.spotify.com/v1/search?q=${randomLetter}&type=album&limit=1`,
//         {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         },
//     )
//     return await searchResponse.data
// }

// export async function getAlbumSong(token: any, albumId: any): Promise<any> {
//     const tracksResponse = await axios.get(
//         `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=10`,
//         {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         },
//     )
//     return tracksResponse.data
// }
