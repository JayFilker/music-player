import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProfileByName, fetchProfileByNation } from '../../api/ranking.ts'
import { SongListImg } from '../SongListImg'
import { rankingListImgList, rankingListName, rankingUpDate } from './rankingListAdditional.tsx'
import './index.less'

export function RankingList() {
    const [songList, setSongList] = useState<Array<any>>()
    const [imgList] = useState<Array<any>>(rankingListImgList)
    const [rankName] = useState<Array<string>>(rankingListName)
    const [upDate] = useState<Array<string>>(rankingUpDate)
    const [keyList] = useState<Array<{ name?: string, nation?: string }>>([{
        name: 'rank',
    }, { nation: 'UK' }, { nation: 'USA' }, { name: 'electronic' }, { nation: 'Japan' }])

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
                                <Link to={`/playsList?id=${item.playlists.items.filter((item: any) => item !== null)[0].id}&type=playlists`} style={{ color: 'white' }}>{rankName[index]}</Link>
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
