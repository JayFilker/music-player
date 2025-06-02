import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SongListImg } from '../SongListImg'
import '../SongList/index.less'

interface Props {
    artist?: string
    style?: object
}

export function ArtistAlbum(props: Props) {
    const { artist, style } = props
    const [id, setId] = useState()
    const [album, setAlbum] = useState<any>(null)
    // 1. 通过艺术家名称搜索获取艺术家ID
    const searchArtist = async (artistName: string, token: string) => {
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        const data = await response.json()
        setId(data.artists.items[0].id)
    }

    // 2. 根据艺术家ID获取专辑
    const getArtistAlbums = async (artistId: string, token: string) => {
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/albums?limit=5&include_groups=album,single`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        const data = await response.json()
        setAlbum(data)
    }
    const [, setAlbumArtist] = useState([])
    // 3. 获取艺术家详细信息
    const getArtistDetails = async (artistId: string, token: string) => {
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        )
        setAlbumArtist(await response.json())
    }
    useEffect(() => {
        const token = localStorage.getItem('spotify_access_token')
        searchArtist(artist as string, token as string).then()

        // const albums = getArtistAlbums(id, token as string)
    }, [])
    useEffect(() => {
        if (id) {
            getArtistAlbums(id as string, localStorage.getItem('spotify_access_token') as string)
            getArtistDetails(id as string, localStorage.getItem('spotify_access_token') as string)
        }
    }, [id])
    return (

        <div
            className="cover-row"
            style={style || { gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {
                album?.items.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className="item"
                        >
                            <SongListImg
                                img={item.images[0].url}
                                index={index}
                                id={(item.id ? item.id : item.playListId) as string}
                            >
                            </SongListImg>
                            <div className="text">
                                <div
                                    className="title"
                                    style={{ fontSize: '16px', margin: '0 0' }}
                                >
                                    <Link to="/" style={{ color: 'white' }}>{item.name}</Link>
                                </div>
                                <div className="info">
                                    <span>{`Album · ${item.release_date.split('-')[0]}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
