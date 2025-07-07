import { useAtom } from 'jotai/index'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import defaultImg from '../../../assets/img/default.png'
import { SongListImg } from '../../../components/SongListImg'
import { SvgIcon } from '../../../components/SvgIcon'
import { ContextMenu } from '../../../components/TopList/ContextMenu'
import { PlayingTrack } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { playListSvg } from './svg.tsx'

export function PlayListInfo(props: any) {
    const {
        songList,
        songListInfo,
        setSongListInfo,
        searchParams,
        setShowShade,
        setTowShow,
        twoShow,
        demo,
        setFirst,
    } = props
    const [showSearch, setShowSearch] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    const list = ['保存到音乐库', '歌单内搜索']
    const { t } = useTranslation()

    function handleFocusInput() {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 10)
        }
    }

    return (
        <div className="playlist-info">
            <SongListImg
                img={songList?.images?.[0]?.url || defaultImg}
                id={songList?.id}
                index={666}
                size="290px"
                check={searchParams.get('type') === 'playlists'}
            >
            </SongListImg>
            <div className="info">
                <div className="title">
                    {songList?.name}
                </div>
                <div className="artist">
                    {searchParams.get('type') === 'playlists' ? `Playlist by ` : songListInfo?.items?.length > 1 ? 'Album by ' : 'Single by '}
                    {searchParams.get('type') === 'playlists'
                        ? (
                                <a
                                    target="blank"
                                    href={`https://music.163.com/#/user/home?id=${songList?.owner?.id}`}
                                >
                                    {songList?.owner ? songList?.owner?.display_name : ''}
                                </a>
                            )
                        : songList?.artists?.map((item: any, index: number) => {
                                return (
                                    <>
                                        <a target="blank" href={`/artist?id=${item.id}`}>{item.name}</a>
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
                        ? songList?.tracks.items[songList?.tracks.items.length - 1].added_at?.split('T')[0].split('-').map((part: any, index: number) => {
                                const units = ['年', '月', '日']
                                return part ? `${part}${units[index] || ''}` : ''
                            }).join('')
                        : songList?.release_date?.split('-')[0]}

                    {' · '}
                    {songList?.tracks?.items?.length}
                    {t('首歌')}
                    {songList?.time ? `,${songList?.time} ${t('分钟')}` : ''}
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
                            eventBus.emit('playList-playing', {
                                e,
                                id: songList?.id,
                                img: searchParams.get('type') === 'playlists' ? songListInfo.items[0].track?.album.images[0].url : songList?.images[0].url,
                                check: searchParams.get('type') === 'playlists',
                            })
                            const demo = playingTrack.map(() => false)
                            demo[0] = true
                            setPlayingTrack(demo)
                            setFirst(false)
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '8px' }}>
                            {playListSvg.play}
                        </SvgIcon>
                        {` ${t('播放')} `}
                    </button>
                    <button className="grey" style={{ borderRadius: '8px', padding: '8px 0px', width: 'auto' }}>
                        <SvgIcon sty={{ marginRight: '0px' }}>
                            {playListSvg.likeSure}
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
                            {playListSvg.omit}
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
                <div className={`container ${inputFocus ? 'active' : ''}`}>
                    <SvgIcon>
                        {playListSvg.search}
                    </SvgIcon>
                    <div className="input">
                        <input
                            ref={inputRef}
                            placeholder={inputFocus ? '' : t('搜索歌单音乐')}
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
    )
}
