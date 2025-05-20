import { useEffect, useState } from 'react'
import { Foryou } from '../../components/Foryou'
import { RankingList } from '../../components/RankingList'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import './index.less'

export default function FirstPage() {
    const [keyList] = useState<Array<{ name: string, limit: number }>>([{
        name: 'Apple Music',
        limit: 5,
    }, { name: 'recommend', limit: 10 }, { name: 'new', limit: 10 }])
    const [contentList, setContentList] = useState<Array<any>>([])
    const [artists, setArtists] = useState<{ artists: { items: Array<any> } }>()
    const searchTerms = ['recommended', 'popular', 'top']
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

    async function fetchProfile(key: string, limit: number): Promise<any> {
        const token = localStorage.getItem('spotify_access_token')
        const result = await fetch(`https://api.spotify.com/v1/search?q=label:"${key}"&type=album&limit=${limit}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })

        return await result.json()
    }

    async function recommendedArtists(): Promise<any> {
        const token = localStorage.getItem('spotify_access_token')

        // 正确的API端点
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(randomTerm)}&type=artist&limit=6`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        return await response.json()
    }

    useEffect(() => {
        const init = async () => {
            const promises = keyList.map(async (item: { name: string, limit: number }) => {
                return await fetchProfile(item.name, item.limit)
            })

            const results = await Promise.all(promises)
            setContentList(results) // 一次性更新整个数组
        }
        init()
        const initTwofun = async () => {
            const a = await recommendedArtists()
            setArtists(a)
        }
        initTwofun()
    }, [])
    return (
        <div className="home">
            <div className="index-row first-row">
                <div className="title">
                    {' '}
                    by Apple Music
                </div>
                <SongList
                    songList={contentList[0]?.albums.items.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }) => {
                        return {
                            number: 0,
                            id: item.id,
                            title: item.name,
                            des: 'by Apple Music',
                            imgPic: item.images[0].url,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="index-row">
                <div className="title">
                    推荐歌单
                    <a href="" className="title-all">查看全部</a>
                </div>
                <SongList
                    songList={contentList[1]?.albums.items.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            imgPic: item.images[0].url,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="index-row">
                <div className="title"> For You</div>
                <Foryou></Foryou>
            </div>
            <div className="index-row">
                <div className="title">
                    推荐艺人
                </div>
                <SongerList
                    artist={
                        artists?.artists?.items?.map((item: any) => {
                            return {
                                name: item.name,
                                personSongList: [],
                                id: item.id,
                                imgPic: item.images?.[0]?.url || 'https://p2.music.126.net/svHK8nEPa8J42tJ1by7jrw==/109951169875194361.jpg?param=512y512',
                            }
                        }) || []
                    }
                >
                </SongerList>
            </div>
            <div className="index-row">
                <div className="title">
                    新专速递
                    <a href="" className="title-all">查看全部</a>
                </div>
                <SongList
                    songList={contentList[2]?.albums.items.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }, index: number) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: contentList[2].albums.items[index].name,
                            imgPic: item.images[0].url,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="index-row">
                <div className="title">
                    排行榜
                    <a href="" className="title-all">查看全部</a>
                </div>
                <RankingList>
                </RankingList>
            </div>
        </div>
    )
}
