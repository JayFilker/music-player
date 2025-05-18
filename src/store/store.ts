import { atom } from 'jotai'

interface Song {
    title: string
    artist: string[]
    imgPic: string
    song: string
    from: string
}
export const SongList = atom<Array<Song>>([{
    title: 'Song 1',
    artist: ['Artist 1', 'ddd'],
    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    song: '/music/song2.mp3',
    from: 'The Band CAMINO',
}, {
    title: 'Song 2',
    artist: ['Artist 1', 'fff'],
    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    song: '/music/song3.mp3',
    from: 'The Band CAMINO',
}])

export const CountDemo = atom(0)
export const BadLike = atom(false)
export const IsPlayingDemo = atom(false)
export const IsPlayingDemoTwo = atom(false)
export const Link = atom(false)
