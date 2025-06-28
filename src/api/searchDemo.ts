// import axios from 'axios'

// export async function getContent(type: string, key: string, token: string, offset?: number) {
//     const result = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(key)}&type=${type}&limit=50&offset=${offset || 0}`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//
//     })
//     return result.data
// }

import { get } from './http.ts'

export function getContent(type: string, key: string, offset?: number) {
    return get(`/search?q=${encodeURIComponent(key)}&type=${type}&limit=50&offset=${offset || 0}`)
}
