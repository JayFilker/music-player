import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function getFavoriteSongs() {
    // const demo = await axios.get('http://localhost:3000/my-songs')
    const demo = await axios.get('https://musicplayernodejs-production.up.railway.app/my-songs')
    return demo.data
}

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

// async function updateFavoriteList(check: boolean, currentSong: any) {
//     if (check) {
//         await axios.post('http://localhost:3000/remove-like-playList-or-albums', currentSong)
//     }
//     else {
//         await axios.post('http://localhost:3000/add-like-playList-or-albums', currentSong)
//     }
// }
async function updateFavoriteList(check: boolean, currentSong: any) {
    if (check) {
        await axios.post('https://musicplayernodejs-production.up.railway.app/remove-like-playList-or-albums', currentSong)
    }
    else {
        await axios.post('https://musicplayernodejs-production.up.railway.app/add-like-playList-or-albums', currentSong)
    }
}

export function useUpdateFavoriteList() {
    return useMutation({
        mutationFn: ({ check, currentSong }: { check: boolean, currentSong: any }) =>
            updateFavoriteList(check, currentSong),
        onSuccess: (data) => {
            console.log('Mutation succeeded:', data)
        },
        onError: (error) => {
            console.error('Mutation failed:', error)
        },
    })
}

async function getFavoriteList(type: string) {
    // const demo = await axios.get('http://localhost:3000/my-playList-or-albums', {
    //     params: {
    //         type,
    //     },
    // })
    const demo = await axios.get('https://musicplayernodejs-production.up.railway.app/my-playList-or-albums', {
        params: {
            type,
        },
    })
    return demo.data
}

export function useFavoriteList(change: boolean, type: string) {
    return useQuery({
        queryKey: ['favoriteList', change, type], // 唯一标识这个查询的键
        queryFn: () => getFavoriteList(type),
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

async function getFavoriteArtist() {
    // const demo = await axios.get('http://localhost:3000/my-artist')
    const demo = await axios.get('https://musicplayernodejs-production.up.railway.app/my-artist')
    return demo.data
}

export function useFavoriteArtist(change: boolean) {
    return useQuery({
        queryKey: ['favoriteArtist', change], // 唯一标识这个查询的键
        queryFn: () => getFavoriteArtist(),
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

// async function updateFavoriteArtist(check: boolean, currentSong: any) {
//     if (check) {
//         await axios.post('http://localhost:3000/remove-artist', currentSong)
//     }
//     else {
//         await axios.post('http://localhost:3000/add-artist', currentSong)
//     }
// }
async function updateFavoriteArtist(check: boolean, currentSong: any) {
    if (check) {
        await axios.post('https://musicplayernodejs-production.up.railway.app/remove-artist', currentSong)
    }
    else {
        await axios.post('https://musicplayernodejs-production.up.railway.app/add-artist', currentSong)
    }
}

export function useUpdateFavoriteArtist() {
    return useMutation({
        mutationFn: ({ check, currentSong }: { check: boolean, currentSong: any }) =>
            updateFavoriteArtist(check, currentSong),
        onSuccess: (data) => {
            console.log('Mutation succeeded:', data)
        },
        onError: (error) => {
            console.error('Mutation failed:', error)
        },
    })
}
