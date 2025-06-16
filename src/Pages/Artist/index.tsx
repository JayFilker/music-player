import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getArtistAlbums, getArtistDetails, getArtistSongs, getNewAlbums } from '../../api/artist.ts'
import { Shade } from '../../components/shade'
import { SongList } from '../../components/SongList'
import { SongListImg } from '../../components/SongListImg'
import { SvgIcon } from '../../components/SvgIcon'
import { ContextMenu } from '../../components/TopList/ContextMenu'
import { Track } from '../../components/Track'
import { CountDemo, CurrentSongList, Playing } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import './index.less'

export default function Artist() {
    const [searchParams] = useSearchParams()
    const [, setPlay] = useAtom(Playing)
    const [, setCount] = useAtom(CountDemo)
    const [, setCurrentSong] = useAtom<{ items: Array<any>, imgPic: string }>(CurrentSongList)
    const [albumsArtist, setAlbumArtist] = useState<any>()
    const token = localStorage.getItem('spotify_access_token')
    const [showShade, setShowShade] = useState(false)
    const [twoShow, setTowShow] = useState(false)
    const list = ['复制链接', '在浏览器中打开']
    useEffect(() => {
        if (!albumsArtist) {
            getArtistDetails(searchParams.get('id'), token).then((data) => {
                setAlbumArtist(data)
            })
        }
    }, [])
    const [album, setAlbum] = useState<any>()
    const [hotSongs, setHotSongs] = useState<any>()
    const [hotSongsDemo, setHotSongsDemo] = useState<any>()
    const [newAlbums, setNewAlbums] = useState<any>()
    useEffect(() => {
        if (albumsArtist) {
            getArtistAlbums(searchParams.get('id'), token).then((data) => {
                setAlbum(data)
            })
            getArtistSongs(searchParams.get('id'), token).then(
                (data) => {
                    setHotSongs(data)
                    setHotSongsDemo({ items: data.tracks })
                },
            )
            getNewAlbums(searchParams.get('id'), token).then((data) => {
                setNewAlbums(data)
            })
        }
    }, [albumsArtist])

    const handleClickOutside = () => {
        if (twoShow) {
            setTowShow(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [twoShow])
    return (
        <div className="artist-page">
            <div className="artist-info">
                <div className="head">
                    <img src={albumsArtist?.images[0].url} loading="lazy" />
                </div>
                <div>
                    <div className="name">
                        {albumsArtist?.name}
                        {/* {{artist.name}} */}
                    </div>
                    <div className="artist">
                        艺人
                    </div>
                    <div className="statistics">
                        <a href="#popularTracks">
                            {`${hotSongs?.tracks.length} 首热门歌曲`}
                        </a
                        >
                        {` · `}
                        <a href="#albums">
                            {`${album?.items?.length} 张专辑`}
                        </a
                        >
                    </div>
                    <div
                        className="description"
                        onClick={() => {
                            setShowShade(true)
                        }}
                    >
                        暂无描述
                    </div>
                    <div className="buttons" style={{ position: 'relative' }}>
                        <button
                            className="blue"
                            style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}

                            onClick={() => {
                                setCurrentSong({
                                    items: [hotSongs?.tracks[0]],
                                    imgPic: hotSongs?.tracks[0]?.album.images[0]?.url,
                                })
                                setCount(0)
                                setPlay((prev) => {
                                    const newPlay = prev.map(() => {
                                        return false
                                    })
                                    newPlay[0] = true
                                    return newPlay
                                })
                                console.log(hotSongs?.tracks[0].url)
                                // @ts-ignore
                                eventBus.emit('play-track', hotSongs?.tracks[0].uri)
                            }}
                        >
                            <SvgIcon sty={{ marginRight: '8px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="svg-inline--fa fa-play fa-w-14"
                                    role="img"
                                    viewBox="0 0 448 512"
                                    id="icon-play"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                            {' 播放 '}
                        </button>
                        <button className="grey" style={{ borderRadius: '8px', padding: '8px 0px', width: 'auto' }}>
                            <SvgIcon sty={{ marginRight: '0px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="icon-heart">
                                    <path
                                        d="M 9.5449219 3 C 5.3895807 3 2 6.3895806 2 10.544922 C 2 14.283156 4.9005496 18.084723 7.6601562 21.119141 C 10.419763 24.153558 13.171875 26.369141 13.171875 26.369141 A 1.0001 1.0001 0 0 0 13.197266 26.388672 C 13.517448 26.630481 13.956962 26.684854 14.369141 26.785156 A 1.0001 1.0001 0 0 0 15 27 A 1.0001 1.0001 0 0 0 15.630859 26.785156 C 16.043038 26.684854 16.482552 26.630481 16.802734 26.388672 A 1.0001 1.0001 0 0 0 16.828125 26.369141 C 16.828125 26.369141 19.580237 24.153558 22.339844 21.119141 C 25.099451 18.084722 28 14.283156 28 10.544922 C 28 6.3895806 24.610419 3 20.455078 3 C 17.450232 3 15.833405 4.5910542 15 5.5664062 C 14.166595 4.5910543 12.549768 3 9.5449219 3 z M 9.5449219 5 C 12.372924 5 14.069642 7.4290597 14.126953 7.5117188 A 1.0001 1.0001 0 0 0 14.910156 8.0078125 A 1.0001 1.0001 0 0 0 15.003906 8.0117188 A 1.0001 1.0001 0 0 0 15.019531 8.0117188 A 1.0001 1.0001 0 0 0 15.042969 8.0097656 A 1.0001 1.0001 0 0 0 15.119141 8.0039062 A 1.0001 1.0001 0 0 0 15.871094 7.5136719 C 15.925786 7.4347249 17.624838 5 20.455078 5 C 23.529737 5 26 7.4702629 26 10.544922 C 26 13.147688 23.499768 16.870104 20.859375 19.773438 C 18.227966 22.666891 15.607768 24.780451 15.589844 24.794922 C 15.414236 24.925626 15.219097 25 15 25 C 14.780903 25 14.585764 24.925626 14.410156 24.794922 C 14.392232 24.780451 11.772034 22.66689 9.140625 19.773438 C 6.5002316 16.870105 4 13.147688 4 10.544922 C 4 7.4702629 6.470263 5 9.5449219 5 z"
                                        fill="currentColor"
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>
                        </button>
                        <button
                            className="grey"
                            onClick={(e) => {
                                e.stopPropagation()
                                setTowShow(true)
                            }}
                        >
                            <SvgIcon sty={{ marginRight: '0px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    viewBox="0 0 512 512"
                                    className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-9x"
                                    id="icon-more"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                                        className=""
                                    >
                                    </path>
                                </svg>
                            </SvgIcon>

                        </button>
                        <ContextMenu
                            style={{
                                display: twoShow ? 'block' : 'none',
                                top: '25px',
                                left: '195px',
                                position: 'absolute',
                            }}
                            setShow={setTowShow}
                            list={list}
                        >
                        </ContextMenu>
                    </div>
                </div>
            </div>
            <div className="latest-release">
                <div className="section-title">
                    最新发布
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
                                            <Link to="/firstPage">{newAlbums?.items[0]?.name}</Link>
                                        </div>
                                        <div className="date">
                                            {newAlbums?.items[0]?.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                                        </div>
                                        <div className="type">
                                            Album ·
                                            {`${newAlbums?.items.length}首歌`}
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
                    热门歌曲
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
                            显示更多
                        </span>
                        <span style={{ display: hotSongsDemo?.items.length > 12 ? '' : 'none' }}>
                            收起
                        </span>
                    </button>
                </div>
            </div>
            <div id="albums" className="albums">
                <div className="section-title">
                    专辑
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
