import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { getArtistAlbums, getArtistDetails, getArtistSongs, getNewAlbums } from '../../api/artist.ts'
import { Shade } from '../../components/shade'
import { SongList } from '../../components/SongList'
import { SongListImg } from '../../components/SongListImg'
import { Track } from '../../components/Track'
import { ArtistInfo } from './ArtistInfo'
import './index.less'

export default function Artist() {
    const [searchParams] = useSearchParams()
    const [albumsArtist, setAlbumArtist] = useState<any>()
    const [showShade, setShowShade] = useState(false)
    const [twoShow, setTowShow] = useState(false)
    const [album, setAlbum] = useState<any>()
    const [hotSongs, setHotSongs] = useState<any>()
    const [hotSongsDemo, setHotSongsDemo] = useState<any>()
    const [newAlbums, setNewAlbums] = useState<any>()
    const { t } = useTranslation()
    const handleClickOutside = () => {
        if (twoShow) {
            setTowShow(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    useEffect(() => {
        if (!albumsArtist) {
            getArtistDetails(searchParams.get('id') as string).then((data) => {
                setAlbumArtist(data)
            })
        }
    }, [])
    useEffect(() => {
        if (albumsArtist) {
            getArtistAlbums(searchParams.get('id') as string).then((data) => {
                setAlbum(data)
            })
            getArtistSongs(searchParams.get('id') as string).then(
                (data) => {
                    setHotSongs(data)
                    setHotSongsDemo({ items: data.tracks })
                },
            )
            getNewAlbums(searchParams.get('id') as string).then((data) => {
                setNewAlbums(data)
            })
        }
    }, [albumsArtist])
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [twoShow])
    return (
        <div className="artist-page">
            <ArtistInfo albumsArtist={albumsArtist} hotSongs={hotSongs} album={album} setShowShade={setShowShade} setTowShow={setTowShow} twoShow={twoShow}></ArtistInfo>
            <div className="latest-release">
                <div className="section-title">
                    {t('最新发布')}
                </div>
                {newAlbums?.items.length > 0
                    ? (
                            <div className="release">
                                <div className="container">

                                    <SongListImg
                                        img={newAlbums?.items[0].images[0].url}
                                        size="128px"
                                        newAlbum={true}
                                        id={newAlbums?.items[0].id}
                                        index={1}
                                    >
                                    </SongListImg>
                                    <div className="info">
                                        <div className="name">
                                            <Link
                                                to={`/playsList?id=${newAlbums?.items[0].id}&type=albums`}
                                            >
                                                {newAlbums?.items[0]?.name}
                                            </Link>
                                        </div>
                                        <div className="date">
                                            {newAlbums?.items[0]?.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                                        </div>
                                        <div className="type">
                                            Album ·
                                            {`${newAlbums?.items.length}`}
                                            {t('首歌')}
                                        </div>
                                    </div>
                                </div>
                                <div className="container latest-mv">
                                    <div
                                        className="cover"
                                    >
                                    </div>
                                    <div className="info">
                                        <div className="name">
                                        </div>
                                        <div className="date">
                                        </div>
                                        <div className="type">
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        )
                    : ''}
            </div>
            <div id="popularTracks" className="popular-tracks">
                <div className="section-title">
                    {t('热门歌曲')}
                </div>
                <Track tracks={hotSongsDemo}></Track>

                <div id="seeMore" className="show-more">
                    <button
                        onClick={() => {
                            if (hotSongsDemo.items.length <= 12) {
                                setHotSongsDemo({ items: hotSongs?.tracks })
                            }
                            else {
                                setHotSongsDemo({ items: hotSongs?.tracks.slice(0, 12) })
                            }
                        }}
                    >
                        <span style={{ display: hotSongsDemo?.items.length <= 12 ? '' : 'none' }}>
                            {t('显示更多')}
                        </span>
                        <span style={{ display: hotSongsDemo?.items.length > 12 ? '' : 'none' }}>
                            {t('收起')}
                        </span>
                    </button>
                </div>
            </div>
            <div id="albums" className="albums">
                <div className="section-title">
                    {t('专辑')}
                </div>
                <SongList
                    songList={album?.items?.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        release_date: string
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: item.release_date.split('-')[0],
                            imgPic: item.images[0].url,
                            content: [],
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="eps">
                <div className="section-title">
                </div>
            </div>
            <Shade
                style={{ display: showShade ? '' : 'none' }}
                artist={true}
                description="暂无描述"
                setShowShade={setShowShade}
            >
            </Shade>
        </div>
    )
}
