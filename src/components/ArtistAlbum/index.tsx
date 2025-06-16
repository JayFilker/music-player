import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArtistAlbum, getArtistDetails, searchArtist } from '../../api/artist.ts'
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
    const [, setAlbumArtist] = useState([])
    useEffect(() => {
        if (artist && !id) {
            const token = localStorage.getItem('spotify_access_token')
            searchArtist(artist as string, token as string).then((data) => {
                setId(data.artists.items[0].id)
            })
        }

        // const albums = getArtistAlbums(id, token as string)
    }, [artist])
    useEffect(() => {
        if (id) {
            console.log(artist)
            getArtistAlbum(id as string, localStorage.getItem('spotify_access_token') as string, 5).then((data) => {
                setAlbum(data)
            })
            getArtistDetails(id as string, localStorage.getItem('spotify_access_token') as string).then((data) => {
                setAlbumArtist(data)
            })
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
