import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SongListImg } from '../SongListImg'
import './index.less'

export function RankingList() {
    const token = localStorage.getItem('spotify_access_token')
    const [songList, setSongList] = useState<Array<any>>()
    const [imgList] = useState<Array<any>>([
        'https://p2.music.126.net/rIi7Qzy2i2Y_1QD7cd0MYA==/109951170048506929.jpg?param=512y512',
        'https://p2.music.126.net/fhAqiflLy3eU-ldmBQByrg==/109951165613082765.jpg?param=512y512',
        'https://p2.music.126.net/rwRsVIJHQ68gglhA6TNEYA==/109951165611413732.jpg?param=512y512',
        'https://p2.music.126.net/oT-RHuPBJiD7WMoU7WG5Rw==/109951166093489621.jpg?param=512y512',
        'https://p2.music.126.net/aXUPgImt8hhf4cMUZEjP4g==/109951165611417794.jpg?param=512y512',
    ])
    const [rankName] = useState<Array<string>>([
        '飙升榜',
        'UK排行榜周榜',
        '美国Billboard榜',
        'Beatport全球电子舞曲榜',
        '日本Oricon榜',
    ])
    const [upDate] = useState<Array<string>>([
        '刚刚更新',
        '每天更新',
        '每周三更新',
        '每周三更新',
        '每天更新',
    ])
    const [keyList] = useState<Array<{ name?: string, nation?: string }>>([{
        name: 'rank',
    }, { nation: 'UK' }, { nation: 'USA' }, { name: 'electronic' }, { nation: 'Japan' }])

    async function fetchProfileByName(name: string): Promise<any> {
        try {
            // 按名称/标签搜索
            const encodedKey = encodeURIComponent(`label:"${name}"`)
            const result = await fetch(`https://api.spotify.com/v1/search?q=${encodedKey}&type=playlist&limit=10`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!result.ok) {
                throw new Error(`API请求失败: ${result.status}`)
            }

            return await result.json()
        }
        catch (error) {
            console.error(`搜索名称 ${name} 时出错:`, error)
            return { albums: { items: [] } }
        }
    }

    async function fetchProfileByNation(nation: string): Promise<any> {
        try {
            // 按国家搜索 - 这里使用market参数
            // const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?country=${nation}&limit=10`, {
            //     method: 'GET',
            //     headers: { Authorization: `Bearer ${token}` },
            // })
            const result = await fetch(`https://api.spotify.com/v1/search?q=label:"${nation}"&type=playlist&limit=10&market=${nation}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!result.ok) {
                throw new Error(`API请求失败: ${result.status}`)
            }

            return await result.json()
        }
        catch (error) {
            console.error(`搜索国家 ${nation} 时出错:`, error)
            return { albums: { items: [] } }
        }
    }

    useEffect(() => {
        const init = async () => {
            const promises = keyList.map(async (item: { name?: string, nation?: string }) => {
                if (item.name) {
                    return await fetchProfileByName(item.name)
                }
                else if (item.nation) {
                    return await fetchProfileByNation(item.nation)
                }
            })

            const results = await Promise.all(promises)
            setSongList(results) // 一次性更新整个数组
        }
        init()
    }, [])
    return (
        <div
            className="cover-row"
            style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {songList?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="item"
                    >
                        <SongListImg
                            img={imgList[index]}
                            index={index}
                            check={true}
                            id={item.playlists.items.filter((item: any) => item !== null)[0].id}
                        >
                        </SongListImg>
                        <div className="text">
                            <div
                                className="title"
                                style={{ fontSize: '16px', margin: '0 0' }}
                            >
                                <Link to="/" style={{ color: 'white' }}>{rankName[index]}</Link>
                            </div>
                            <div className="info">
                                <span>{upDate[index]}</span>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
