import { get } from './http.ts'
// export async function fetchProfile(key: string): Promise<any> {
//     const token = localStorage.getItem('spotify_access_token')
//     // 指定多个类型，用逗号分隔
//     const types = 'artist,album,track,playlist'
//
//     // 对查询关键词进行编码
//     const query = encodeURIComponent(key)
//
//     const result = await axios.get(
//         `https://api.spotify.com/v1/search?q=${query}&type=${types}&limit=20`,
//         {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         },
//     )
//
//     return await result.data
// }

export function fetchProfile(key: string): Promise<any> {
    const types = 'artist,album,track,playlist'
    const query = encodeURIComponent(key)
    return get(`/search?q=${query}&type=${types}&limit=20`)
}

// export async function firstFetchProfile(key: string, limit: number, type: string, token: any): Promise<any> {
//     const result = await axios.get(`https://api.spotify.com/v1/search?q=label:"${key}"&type=${type}&limit=${limit}&market=JP`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
//     return await result.data
// }

export function firstFetchProfile(key: string, limit: number, type: string): Promise<any> {
    return get(`/search?q=label:"${key}"&type=${type}&limit=${limit}&market=JP`)
}

// export async function recommendedArtists(token: any, randomTerm: any): Promise<any> {
//     // 正确的API端点
//     const response = await axios.get(
//         `https://api.spotify.com/v1/search?q=${encodeURIComponent(randomTerm)}&type=artist&limit=6`,
//         {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         },
//     )
//
//     return await response.data
// }

export function recommendedArtists(randomTerm: any): Promise<any> {
    // 正确的API端点
    return get(`/search?q=${encodeURIComponent(randomTerm)}&type=artist&limit=6`)
}
