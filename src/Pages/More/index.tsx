import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { firstFetchProfile } from '../../api/search.ts'
import defaultImg from '../../assets/img/default.png'
import { SongList } from '../../components/SongList'
import './index.less'

export default function More() {
    const [searchParams] = useSearchParams()
    const token = localStorage.getItem('spotify_access_token')
    const [contentList, setContentList] = useState<any>()
    const getContentList = async () => {
        const result = await firstFetchProfile(searchParams.get('key') as string, 50, 'album', token)
        setContentList(result)
    }

    useEffect(() => {
        getContentList()
    }, [])
    return (
        <div className="newAlbum">
            <h1 style={{ color: '#fff' }}>
                {searchParams.get('key') === 'new' ? '新专速递' : searchParams.get('key')}
            </h1>
            <div className="playlist-row">
                <div className="playlists">
                    <SongList
                        songList={contentList?.albums?.items.map((item: {
                            id: string
                            name: string
                            images: Array<any>
                        }, index: number) => {
                            return {
                                id: item.id,
                                title: item.name,
                                des: contentList?.albums?.items[index].name,
                                imgPic: item?.images[0]?.url || defaultImg,
                                content: [],
                            }
                        })}
                    >
                    </SongList>
                </div>
            </div>
        </div>
    )
}
