import { get } from './http.ts'
// export async function getPlaysList(type: any, id: any) {
//     const tokenOne = localStorage.getItem('spotify_access_token')
//     const response = await axios.get(`https://api.spotify.com/v1/${type}/${id}`, {
//         headers: { Authorization: `Bearer ${tokenOne}` },
//     })
//
//     // 直接返回数据，不需要再 await response.data
//     return response.data
// }

export function getPlaysList(type: any, id: any) {
    return get(`/${type}/${id}`)
}

// export async function internalInit(id: string, check: boolean, tokenOne: string): Promise<any> {
//     const response = check
//         ? await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
//                 headers: { Authorization: `Bearer ${tokenOne}` },
//             })
//         : await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
//                 headers: { Authorization: `Bearer ${tokenOne}` },
//             })
//
//     return await response.data
// }
export function internalInit(id: string, check: boolean): Promise<any> {
    if (check) {
        return get(`/playlists/${id}/tracks`)
    }
    else {
        return get(`/albums/${id}/tracks`)
    }
}
