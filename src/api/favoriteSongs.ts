import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function getFavoriteSongs() {
    const demo = await axios.get('https://musicplayernodejs-production.up.railway.app/my-songs')
    return demo.data
}
// async function getFavoriteSongs() {
//     const demo = await axios.get('http://localhost:3000/my-songs')
//     return demo.data
// }

export function useFavoriteSongs(change: boolean) {
    return useQuery({
        queryKey: ['favoriteSongs', change], // 唯一标识这个查询的键
        queryFn: () => getFavoriteSongs(),
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

// async function updateFavoriteSongs(check: boolean, currentSong: any) {
//     if (check) {
//         await axios.post('http://localhost:3000/remove-like-song', currentSong)
//     }
//     else {
//         await axios.post('http://localhost:3000/add-like-song', currentSong)
//     }
// }

async function updateFavoriteSongs(check: boolean, currentSong: any) {
    if (check) {
        await axios.post('https://musicplayernodejs-production.up.railway.app/remove-like-song', currentSong)
    }
    else {
        await axios.post('https://musicplayernodejs-production.up.railway.app/add-like-song', currentSong)
    }
}

// export function useUpdateFavoriteSongs() {
//     return useMutation({
//         mutationFn: ({ check, currentSong }: { check: boolean, currentSong: any }) =>
//             updateFavoriteSongs(check, currentSong),
//     })
// }
export function useUpdateFavoriteSongs() {
    return useMutation({
        mutationFn: ({ check, currentSong }: { check: boolean, currentSong: any }) =>
            updateFavoriteSongs(check, currentSong),
        onSuccess: (data) => {
            console.log('Mutation succeeded:', data)
        },
        onError: (error) => {
            console.error('Mutation failed:', error)
        },
    })
}
