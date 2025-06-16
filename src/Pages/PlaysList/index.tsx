import { useAtom } from 'jotai/index'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getPlaysList, internalInit } from '../../api/check.ts'
import defaultImg from '../../assets/img/default.png'
import { ArtistAlbum } from '../../components/ArtistAlbum'
import { Shade } from '../../components/shade'
import { SongListImg } from '../../components/SongListImg'
import { SvgIcon } from '../../components/SvgIcon'
import { ContextMenu } from '../../components/TopList/ContextMenu'
import { TrackList } from '../../components/TrackList'
import { PlayingTrack } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import './index.less'

export default function PlaysList() {
    const [searchParams] = useSearchParams()
    const [songList, setSongList] = useState<any>()
    const [twoShow, setTowShow] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [showShade, setShowShade] = useState(false)
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    const [demo, setDemo] = useState<any>()

    useEffect(() => {
        const type = searchParams.get('type')
        const id = searchParams.get('id')
        getPlaysList(type, id)
            .then((data) => {
                setSongList(data)
            })
    }, [searchParams.get('id')])
    const [songListInfo, setSongListInfo] = useState<any>()

    async function inIt(id: string) {
        const tokenOne = localStorage.getItem('spotify_access_token')
        internalInit(id, searchParams.get('type') === 'playlists', tokenOne as string).then((data: any) => {
            let time = 0
            setSongListInfo(data)
            setDemo(data)
            if (searchParams.get('type') === 'albums') {
                data.items.forEach((track: any) => {
                    time += track.duration_ms
                })
                setSongList({ ...songList, time: Math.floor(time / 60000) })
            }
        })
    }

    useEffect(() => {
        if (songList && !songList.time) {
            inIt(songList.id)
        }
    }, [songList])

    function handleFocusInput() {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 10)
        }
        // setInputFocus(true)
    }

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
    const list = ['保存到音乐库', '歌单内搜索']
    return (
        <div className={`playlist ${searchParams.get('type') !== 'playlists' ? 'album-page' : ''}`}>
            <div
                className="playlist-info"
            >
                <SongListImg
                    img={songList?.images[0]?.url || defaultImg}
                    id={songList?.id}
                    index={666}
                    size="290px"
                    check={searchParams.get('type') === 'playlists'}
                >

                </SongListImg>
                <div className="info">
                    <div
                        className="title"
                    >
                        {/* <span className="lock-icon"> */}
                        {/*    /!* <svg-icon icon-class="lock" /> *!/ */}
                        {/* </span */}
                        {/* > */}
                        {songList?.name}
                        {/* {{ playlist.name }} */}
                    </div
                    >
                    <div className="artist">
                        {searchParams.get('type') === 'playlists' ? `Playlist by ` : songListInfo?.items?.length > 1 ? 'Album by ' : 'Single by '}
                        {searchParams.get('type') === 'playlists'
                            ? <a target="blank">{songList?.owner.display_name}</a>
                            : songList?.artists.map((item: any, index: number) => {
                                    return (
                                        <>
                                            <a target="blank">{item.name}</a>
                                            {
                                                index < songList.artists.length - 1 && ', '
                                            }
                                        </>
                                    )
                                })}
                    </div>
                    <div className="date-and-count">
                        {searchParams.get('type') === 'playlists'
                            ? '最后更新于 '
                            : ''}

                        {searchParams.get('type') === 'playlists'
                            ? songList?.tracks.items[songList?.tracks.items.length - 1].added_at.split('T')[0].split('-').map((part: any, index: number) => {
                                    const units = ['年', '月', '日']
                                    return part ? `${part}${units[index] || ''}` : ''
                                }).join('')
                            : songList?.release_date.split('-')[0]}

                        {' · '}
                        {/* {songList?.total_tracks} */}
                        {songList?.tracks.items.length}
                        首歌
                        {songList?.time ? `,${songList?.time} 分钟` : ''}
                    </div>
                    <div
                        className="description"
                        onClick={() => {
                            setShowShade(true)
                        }}
                    >
                        {songList?.description ? songList?.description : '暂无描述'}
                    </div>
                    <div className="buttons" style={{ position: 'relative' }}>
                        <button
                            className="blue"
                            style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}

                            onClick={(e) => {
                                eventBus.emit('playList-playing', { e, id: songList?.id, img: songList?.images[0].url })
                                const demo = playingTrack.map(() => false)
                                demo[0] = true
                                setPlayingTrack(demo)
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
                            setShowSearch={setShowSearch}
                            showSearch={showSearch}
                            inputfocus={handleFocusInput}
                        >
                        </ContextMenu>
                    </div>
                </div>
                <div className="search-box" style={{ display: showSearch ? '' : 'none' }}>
                    <div
                        className={`container ${inputFocus ? 'active' : ''}`}
                    >
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="svg-inline--fa fa-search fa-w-16"
                                role="img"
                                viewBox="0 0 512 512"
                                id="icon-search"
                            >
                                <path
                                    fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                >
                                </path>
                            </svg>
                        </SvgIcon>
                        <div className="input">
                            <input
                                ref={inputRef}
                                placeholder={inputFocus ? '' : '搜索歌单音乐'}
                                onFocus={() => {
                                    setInputFocus(true)
                                }}
                                onBlur={() => {
                                    setInputFocus(false)
                                }}
                                onChange={(e) => {
                                    const keyword = e.target.value
                                    if (keyword === '') {
                                        setSongListInfo(demo)
                                    }
                                    else {
                                        if (searchParams.get('type') === 'playlists') {
                                            setSongListInfo({
                                                ...demo,
                                                items: demo?.items?.filter((item: any) => item.track.name.includes(keyword)),
                                            })
                                        }
                                        else {
                                            setSongListInfo({
                                                ...demo,
                                                items: demo?.items?.filter((item: any) => item.name.includes(keyword)),
                                            })
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {searchParams.get('type') === 'playlists'
                ? (
                        <TrackList
                            songListInfo={songListInfo}
                            songList={songList}
                        >
                        </TrackList>
                    )
                : <TrackList songListInfo={songListInfo} songList={songList}></TrackList>}
            <div className="extra-info" style={{ display: searchParams.get('type') === 'playlists' ? 'none' : '' }}>
                <div className="album-time"></div>
                <div className="release-date" style={{ color: '#fff' }}>
                    发行于
                    {songList?.release_date?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                </div>
            </div>
            {searchParams.get('type') === 'playlists'
                ? ' '
                : (
                        <div className="more-by">
                            <div className="section-title">
                                {'More by '}
                                <Link to="./">
                                    {songList?.artists[0].name}
                                </Link>
                            </div>
                            <div>
                                <ArtistAlbum artist={songList?.artists[0].name}></ArtistAlbum>
                            </div>
                        </div>
                    )}
            <Shade
                style={{ display: showShade ? '' : 'none' }}
                name={songList?.name}
                description={songList?.description ? songList?.description : '暂无描述'}
                setShowShade={setShowShade}
            >
            </Shade>
        </div>
    )
}
