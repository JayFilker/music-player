import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Movie } from '../../components/Movie'
// import { SongerList } from '../../components/SongerList'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { Track } from '../../components/Track'
import './index.less'
import '../../components/SongListImg/index.less'

export default function Search() {
    const [searchParams] = useSearchParams()

    async function fetchProfile(key: string): Promise<any> {
        const token = localStorage.getItem('spotify_access_token')
        // 指定多个类型，用逗号分隔
        const types = 'artist,album,track,playlist'

        // 对查询关键词进行编码
        const query = encodeURIComponent(key)

        const result = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=${types}&limit=20`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        return await result.json()
    }

    const [content, setContent] = useState<any>()

    const [movie, setMovie] = useState<any>()
    // const [movie, setMovie] = useAtom<any>(MovieList)

    async function getMusic() {
        const response = await axios.get(`http://localhost:3000/api/videos`)
        // return response.data.videos
        setMovie(response.data.videos)
    }

    useEffect(() => {
        const currentQuery = searchParams.get('q') || ''
        // setQuery(currentQuery)
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
    console.log(content)
    return (
        <div className="search-page">
            <div className="row">
                <div className="artists">
                    <div

                        className="section-title"
                    >
                        艺人
                        <Link to="/search">查看全部</Link>
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
                    {/* <CoverRow */}
                    {/*    type="artist" */}
                    {/* :column-number="3" */}
                    {/* :items="artists.slice(0, 3)" */}
                    {/* gap="34px 24px" */}
                    {/* /> */}
                </div>

                <div className="albums">
                    <div

                        className="section-title"
                    >
                        专辑
                        <Link to="/search">查看全部</Link>
                        {/*    {{$t('search.album') */}
                        {/* }} */}
                        {/*    <router-link */}
                        {/*    :to="`/search/${keywords}/albums`">{{ */}
                        {/*        $t('home.seeMore') */}
                        {/*    }}</router-link> */}
                    </div
                    >
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
                    {/* <CoverRow */}
                    {/*    type="album" */}
                    {/* :items="albums.slice(0, 3)" */}
                    {/* sub-text="artist" */}
                    {/* :column-number="3" */}
                    {/* sub-text-font-size="14px" */}
                    {/* gap="34px 24px" */}
                    {/* :play-button-size="26" */}
                    {/* /> */}
                </div>
            </div>

            <div className="tracks">
                <div
                    className="section-title"
                >
                    歌曲
                    <Link to="/search">查看全部</Link>
                    {/*    {{$t('search.song') */}
                    {/* }} */}
                    {/*    <router-link */}
                    {/*    :to="`/search/${keywords}/tracks`">{{ */}
                    {/*        $t('home.seeMore') */}
                    {/*    }}</router-link> */}
                </div
                >
                <Track tracks={content?.tracks}></Track>
                {/* <TrackList :tracks = 'tracks' */}
                {/* type = 'tracklist' / > */}
            </div>

            <div className="music-videos">
                <div
                    className="section-title"
                >
                    视频
                    <Link to="/search">查看全部</Link>
                    {/*    {{$t('search.mv') */}
                    {/* }} */}
                    {/*    <router-link */}
                    {/*    :to="`/search/${keywords}/music-videos`">{{ */}
                    {/*        $t('home.seeMore') */}
                    {/*    }}</router-link> */}
                </div
                >
                {/* <img src={yyy ? `http://${yyy[0].img}` : null} /> */}
                <Movie movie={movie} keyValue={searchParams.get('q') || ''}></Movie>
                {/* <MvRow :mvs = 'musicVideos.slice(0, 5)' / > */}
            </div>

            <div className="playlists">
                <div
                    className="section-title"
                >
                    歌单
                    <Link to="/search">查看全部</Link>
                </div
                >
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
                <div>
                    {/* <svg-icon icon-class="search" /> */}
                    {/* {{ */}
                    {/*    keywords.length === 0 ? '输入关键字搜索' : $t('search.noResult') */}
                    {/* }} */}
                </div
                >
            </div>
        </div>
    )
}
