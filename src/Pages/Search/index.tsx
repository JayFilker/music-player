import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchProfile } from '../../api/search'
import { Movie } from '../../components/Movie'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { Track } from '../../components/Track'
import './index.less'
import '../../components/SongListImg/index.less'

export default function Search() {
    const [searchParams] = useSearchParams()
    const [content, setContent] = useState<any>()
    const [movie, setMovie] = useState<any>()

    async function getMusic() {
        const response = await axios.get(`http://localhost:3000/api/videos`)
        setMovie(response.data.videos)
    }

    useEffect(() => {
        const currentQuery = searchParams.get('q') || ''
        const a = async () => {
            try {
                const s = await fetchProfile(currentQuery)
                setContent(s)
            }
            catch (error) {
                console.error('获取数据失败:', error)
            }
        }
        a()
        getMusic()
    }, [searchParams])
    return (
        <div className="search-page">
            <div className="row">
                <div className="artists">
                    <div className="section-title">
                        艺人
                        <Link to={`/searchDemo?type=artist&key=${searchParams.get('q')}`}>查看全部</Link>
                    </div>
                    <SongerList
                        gap="34px 24px"
                        gridTemplateColumns="repeat(3, 1fr)"
                        artist={
                            content?.artists?.items
                                ?.filter((_itemDemo: any, index: number) => index < 3)
                                ?.map((item: any) => ({
                                    name: item.name,
                                    personSongList: [],
                                    id: item.id,
                                    imgPic: item.images?.[0]?.url || 'https://p2.music.126.net/svHK8nEPa8J42tJ1by7jrw==/109951169875194361.jpg?param=512y512',
                                })) || []
                        }
                    >
                    </SongerList>
                </div>

                <div className="albums">
                    <div className="section-title">
                        专辑
                        <Link to={`/searchDemo?type=album&key=${searchParams.get('q')}`}>查看全部</Link>
                    </div>
                    <SongList
                        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '34px 24px' }}
                        songList={content?.albums.items?.filter((_itemDemo: any, index: number) => index < 3)
                            ?.map((item: {
                                id: string
                                name: string
                                images: Array<any>
                            }, index: number) => {
                                return {
                                    id: item.id,
                                    title: item.name,
                                    des: content.albums.items[index].artists[0].name,
                                    imgPic: item.images[0].url,
                                    content: [],
                                }
                            })}
                    >
                    </SongList>
                </div>
            </div>

            <div className="tracks">
                <div className="section-title">
                    歌曲
                    <Link to={`/searchDemo?type=track&key=${searchParams.get('q')}`}>查看全部</Link>
                </div>
                <Track tracks={content?.tracks}></Track>
            </div>

            <div className="music-videos">
                <div className="section-title">
                    视频
                    <Link to={`/searchDemo?type=movie&key=${searchParams.get('q')}`}>查看全部</Link>
                </div>
                <Movie movie={movie} keyValue={searchParams.get('q') || ''}></Movie>
            </div>

            <div className="playlists">
                <div className="section-title">
                    歌单
                    <Link to={`/searchDemo?type=playlist&key=${searchParams.get('q')}`}>查看全部</Link>
                </div>
                <SongList
                    style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '34px 24px' }}
                    songList={content?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }) => {
                        return {
                            playListId: item.id,
                            title: item.name,
                            imgPic: item.images[0].url,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="no-results" style={{ display: 'none' }}>
                <div></div>
            </div>
        </div>
    )
}
