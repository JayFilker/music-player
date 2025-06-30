import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useArtistAlbum, useArtistDetails, useSearchArtist } from '../../api/artist.ts'
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
    const { data } = useArtistDetails(id)
    const { data: artistAlbumDate } = useArtistAlbum(id, 5)
    const { data: searchArtist } = useSearchArtist(artist)
    useEffect(() => {
        if (artistAlbumDate) {
            setAlbum(artistAlbumDate)
        }
    }, [artistAlbumDate])
    useEffect(() => {
        if (data) {
            setAlbumArtist(data)
        }
    }, [data])
    useEffect(() => {
        if (searchArtist) {
            setId(searchArtist.artists.items[0].id)
        }
    }, [searchArtist])
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
                                    <Link
                                        to={`/playsList?id=${(item.id ? item.id : item.playListId) as string}&type=albums`}
                                        style={{ color: 'white' }}
                                    >
                                        {item.name}
                                    </Link>
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
