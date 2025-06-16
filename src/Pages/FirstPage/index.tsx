import { useEffect, useState } from 'react'
import { firstFetchProfile, recommendedArtists } from '../../api/search.ts'
import defaultImg from '../../assets/img/default.png'
import { Foryou } from '../../components/Foryou'
import { RankingList } from '../../components/RankingList'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import './index.less'

export default function FirstPage() {
    const [keyList] = useState<Array<{ name: string, limit: number }>>([{
        name: 'Apple',
        limit: 5,
    }, { name: 'recommend', limit: 10 }, { name: 'new', limit: 10 }])
    const [contentList, setContentList] = useState<Array<any>>([])
    const [artists, setArtists] = useState<{ artists: { items: Array<any> } }>()
    const searchTerms = ['recommended', 'popular', 'top']
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('spotify_access_token')
            const promises = keyList.filter((_item, index) => index < 2).map(async (item: {
                name: string
                limit: number
            }) => {
                return await firstFetchProfile(item.name, item.limit, 'playlist', token)
            },
            )

            const promise = await firstFetchProfile(keyList[2].name, keyList[2].limit, 'album', token)

            const results = contentList.map(item => item)
            results[0] = await promises[0] // 更新第一个元素
            results[1] = await promises[1] // 更新第二个元素
            results[2] = promise // 更新第三个元素
            setContentList(results) // 一次性更新整个数组
        }
        init().then()
        const initTwofun = async () => {
            const token = localStorage.getItem('spotify_access_token')
            const a = await recommendedArtists(token, randomTerm)
            setArtists(a)
        }
        initTwofun().then()
    }, [])
    return (
        <div className="home">
            <div className="index-row first-row">
                <div className="title">
                    {' '}
                    by Apple Music
                </div>
                <SongList
                    songList={contentList[0]?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
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
            <div className="index-row">
                <div className="title">
                    推荐歌单
                    <a href="" className="title-all">查看全部</a>
                </div>
                <SongList
                    songList={contentList[1]?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                    }) => {
                        return {
                            playListId: item.id,
                            title: item.name,
                            imgPic: item?.images[0]?.url,
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
                                imgPic: item.images?.[0]?.url || defaultImg,
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
                            imgPic: item?.images[0]?.url || defaultImg,
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
