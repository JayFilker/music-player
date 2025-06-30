import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetchProfileByName, useFetchProfileByNation } from '../../api/ranking.ts'
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
    const { data: rank } = useFetchProfileByName(keyList[0].name)
    const { data: electronic } = useFetchProfileByName(keyList[3].name)
    const { data: uK } = useFetchProfileByNation(keyList[1].nation)
    const { data: uSA } = useFetchProfileByNation(keyList[2].nation)
    const { data: japan } = useFetchProfileByNation(keyList[4].nation)

    useEffect(() => {
        if (rank && electronic && uK && uSA && japan) {
            const results = [rank, uK, uSA, electronic, japan]
            setSongList(results)
        }
    }, [rank, electronic, uK, uSA, japan])
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
                                <Link
                                    to={`/playsList?id=${item.playlists.items.filter((item: any) => item !== null)[0].id}&type=playlists`}
                                    style={{ color: 'white' }}
                                >
                                    {rankName[index]}
                                </Link>
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
