import { useAtom } from 'jotai/index'
import { useState } from 'react'
import {
    BadLike,
    CountDemo,
    CurrentSongList,
    IsPlayingDemoTwo,
    Link,
} from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { SvgIcon } from '../SvgIcon'
import '../SongList/index.less'

interface Props {
    artist: Array<{
        name: string
        imgPic: string
        id: string
        personSongList: Array<{
            title: string
            artist: Array<string>
            imgPic: string
            song: string
            from: string
        }>
    }>
}

export function SongerList(props: Props) {
    const { artist } = props
    const [show, setShow] = useState<Array<boolean>>(
        Array.from({ length: 10 }).fill([]).map(() => false),
    )
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [, setCount] = useAtom(CountDemo)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const [songList, setSongList] = useState<Array<any>>([{}, {}, {}, {}, {}, {}])

    const getArtistSongList = async (artistId: string, index: number) => {
        if (songList[index].items?.length > 0) {
            // 更新当前歌曲列表状态
            setCurrentSong({
                ...songList[index],
                imgPic: artist[index].imgPic,
            })
            setCount(0)

            // @ts-ignore
            eventBus.emit('play-track', songList[index].items[0].uri)
        }
        else {
            // 获取艺术家的专辑
            const token = localStorage.getItem('spotify_access_token')
            const albumsResponse = await fetch(
                `https://api.spotify.com/v1/artists/${artistId}/albums?limit=1&include_groups=album,single`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            )

            const albumsData = await albumsResponse.json()

            // 检查是否有专辑
            if (albumsData?.items?.length > 0) {
                const albumId = albumsData.items[0].id

                // 获取专辑的曲目
                const tracksResponse = await fetch(
                    `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=10`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                )

                const tracksData = await tracksResponse.json()

                // 更新专辑列表状态
                const updatedSongList = [...songList]
                updatedSongList[index] = tracksData
                setSongList(updatedSongList)

                // 更新当前歌曲列表状态
                setCurrentSong({
                    ...tracksData,
                    imgPic: artist[index].imgPic,
                })
                setCount(0)

                // @ts-ignore
                eventBus.emit('play-track', tracksData.items[0].uri)
            }
        }
    }

    return (
        <div
            className="cover-row"
            style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '44px 24px' }}
        >
            {artist.map((item, index: number) => {
                return (
                    <div className="item artist" key={index}>
                        <div
                            className="cover cover-hover"
                            onMouseMove={() => {
                                const demo = show.map(item => item)
                                demo[index] = true
                                setShow(demo)
                            }}
                            onMouseOut={() => {
                                const demo = show.map(item => item)
                                demo[index] = false
                                setShow(demo)
                            }}
                        >
                            <div className="cover-container">
                                <div className="shade">
                                    <button
                                        className="play-button"
                                        style={{
                                            width: '26%',
                                            height: '26%',
                                            display: show[index] ? 'block' : 'none',
                                        }}
                                        onClick={() => {
                                            setLinkDemo(false)
                                            setBadLikeDemo(false)
                                            setIsPlayingTwo(false)
                                            getArtistSongList(item.id, index)
                                        }}
                                    >
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="svg-inline--fa fa-play fa-w-14"
                                                role="img"
                                                viewBox="0 0 448 512"
                                                id="icon-play"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                                >
                                                </path>
                                            </svg>
                                        </SvgIcon>
                                    </button>
                                </div>
                                <img
                                    src={item.imgPic}
                                    loading="lazy"
                                    style={{ borderRadius: '50%' }}
                                />
                                <div
                                    className="shadow"
                                    style={{
                                        backgroundImage: `url(${item.imgPic})`,
                                        borderRadius: '50%',
                                        display: show[index] ? 'block' : 'none',
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <div className="title" style={{ fontSize: '16px' }}>
                                <a
                                    href="#/artist/12138269"
                                >
                                    {item.name}
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
