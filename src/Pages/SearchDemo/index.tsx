import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import defaultImg from '../../assets/img/default.png'
import { ButtonIconTwo } from '../../components/ButtonIconTwo'
import { Movie } from '../../components/Movie'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { TrackList } from '../../components/TrackList'
import '../../components/SongListImg/index.less'
import './index.less'

export default function SearchDemo() {
    const [searchParams] = useSearchParams()
    const [movie, setMovie] = useState<any>()
    const tokenOne = localStorage.getItem('spotify_access_token')
    const [contentList, setContentList] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [currentNumber, setCurrentNumber] = useState(0)

    async function getMusic() {
        const response = await axios.get(`http://localhost:3000/api/videos`)
        // return response.data.videos
        setMovie(response.data.videos)
    }

    async function getContent(type: string, key: string, token: string, offset?: number) {
        const result = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(key)}&type=${type}&limit=50&offset=${offset || 0}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })
        return result.data
    }

    useEffect(() => {
        const demo = async () => {
            if (searchParams.get('type') && searchParams.get('key')) {
                setTitle(searchParams.get('type') === 'artist' ? '艺人' : searchParams.get('type') === 'album' ? '专辑' : searchParams.get('type') === 'playlist' ? '歌单' : searchParams.get('type') === 'movie' ? '视频' : '歌曲')
                if (searchParams.get('type') !== 'movie') {
                    setContentList(await getContent(searchParams.get('type') as string, searchParams.get('key') as string, tokenOne as string))
                }
                else {
                    getMusic()
                }
            }
        }
        demo()
    }, [])
    return (
        <div className="search">
            <h1>
                <span>
                    {`搜索 ${title} `}
                </span>
                "
                {searchParams.get('key')}
                "
            </h1>

            <div style={{ display: searchParams.get('type') === 'artist' ? '' : 'none' }}>
                <SongerList
                    artist={
                        contentList?.artists?.items?.map((item: any) => {
                            return {
                                name: item.name,
                                personSongList: [],
                                id: item.id,
                                imgPic: item.images?.[0]?.url || defaultImg,
                            }
                        }) || []
                    }
                >
                </SongerList>
            </div>
            <div style={{ display: searchParams.get('type') === 'album' ? '' : 'none' }}>
                <SongList
                    songList={contentList?.albums?.items?.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        artists: Array<any>
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: item?.artists[0]?.name,
                            imgPic: item?.images[0]?.url || defaultImg,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div style={{ display: searchParams.get('type') === 'track' ? '' : 'none' }}>
                <TrackList trackDemo={contentList?.tracks}></TrackList>
            </div>
            <div style={{ display: searchParams.get('type') === 'movie' ? '' : 'none' }}>
                <Movie movie={movie} keyValue={searchParams.get('key') || ''} limitNumber={0}></Movie>
            </div>
            <div style={{ display: searchParams.get('type') === 'playlist' ? '' : 'none' }}>
                <SongList
                    songList={contentList?.playlists?.items.filter((_itemDemo: any) => _itemDemo !== null).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }) => {
                        return {
                            playListId: item?.id,
                            title: item?.name,
                            imgPic: item?.images[0]?.url || defaultImg,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>

            <div className="load-more">
                <ButtonIconTwo
                    color="grey"
                    style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}
                    onClick={async () => {
                        if (searchParams.get('type') === 'movie') {
                            return
                        }
                        const type = `${searchParams.get('type')}s`
                        const newOffset = currentNumber + 50
                        await getContent(searchParams.get('type') as string, searchParams.get('key') as string, tokenOne as string, newOffset).then((res) => {
                            const contentListDemo = {
                                ...contentList,
                            }
                            contentListDemo[type] = {
                                ...contentList[type],
                                items: [...contentList[type]?.items, ...res[type]?.items],
                            }
                            setContentList(contentListDemo)
                        })
                        setCurrentNumber(newOffset)
                    }}
                >
                    加载更多
                </ButtonIconTwo>
            </div>
        </div>
    )
}
