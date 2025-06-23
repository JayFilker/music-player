import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { internalInit } from '../../api/check.ts'
import { BadLike, CountDemo, CurrentSongList, FirstPlay, IsPlayingDemoTwo, Link } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { SvgIcon } from '../SvgIcon'
import './index.less'

export function SongListImg(props: {
    img: string
    id: string
    number?: number
    index: number
    check?: boolean
    size?: string
    newAlbum?: boolean
}) {
    const { img, id, index, number, check, size, newAlbum } = props
    const [, setCount] = useAtom(CountDemo)
    const [, setFirstPlay] = useAtom(FirstPlay)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const navigate = useNavigate()
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [show, setShow] = useState<boolean>(false)
    const initTwo = async (id: string, imgDemo: string, play: any, count?: number) => {
        const tokenOne = localStorage.getItem('spotify_access_token')
        await internalInit(id, check || false, tokenOne as string).then((tracksData) => {
            count ? setCount(count) : setCount(0)
            setCurrentSong({
                ...tracksData,
                items: tracksData.items.map((item: any) => item.track || item),
                imgPic: imgDemo,
            })
            if (play) {
                setFirstPlay(false)
                if (count) {
                    // @ts-ignore
                    check ? eventBus.emit('play-track', tracksData?.items[count].track.uri) : eventBus.emit('play-track', tracksData?.items[count].uri)
                }
                else {
                    // @ts-ignore
                    check ? eventBus.emit('play-track', tracksData?.items[0].track.uri) : eventBus.emit('play-track', tracksData?.items[0].uri)
                }
            }
        })
    }
    function handleClick(data: { e: React.MouseEvent, id: any, index: any, img: string, count?: number }) {
        data.e.stopPropagation()
        setLinkDemo(false)
        setBadLikeDemo(false)
        setIsPlayingTwo(false)
        data.count ? initTwo(data.id, data.img, true, data.count) : initTwo(data.id, data.img, true)
    }
    useEffect(() => {
        if (number === 0 && index === 0) {
            initTwo(id, img, false)
        }
    }, [])
    useEffect(() => {
        eventBus.on('playList-playing', ({ e, id, img, count }) => {
            handleClick({ e, id, index: 1, img, count })
        })
        return () => {
            eventBus.off('playList-playing') // 记得清理
        }
    }, [])
    return (
        <div
            className="cover cover-hover"
            onMouseMove={() => {
                setShow(true)
            }}
            onMouseOut={() => {
                setShow(false)
            }}
            onClick={() => {
                navigate(`/playsList?id=${id}&type=${check ? 'playlists' : 'albums'}`)
            }}
        >
            <div
                className="cover-container"
                onClick={(e) => {
                    if (size && !newAlbum) {
                        handleClick({ e, id, index, img })
                    }
                }}
            >
                <div className="shade">
                    <button
                        // v-show="focus"
                        className="play-button"
                        style={
                            size
                                ? {
                                        display: show ? 'block' : 'none',
                                        width: newAlbum ? '30%' : '18%',
                                        height: newAlbum ? '30%' : '18%',
                                    }
                                : {
                                        display: show ? 'block' : 'none',
                                        width: '22%',
                                        height: '22%',
                                    }
                        }

                        onClick={(e) => {
                            handleClick({ e, id, index, img })
                        }}
                    >
                        <SvgIcon sty={{ width: '65%', height: '65%' }}>
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
                    </button>
                </div>
                <img
                    src={img}
                    loading="lazy"
                    alt=""
                    style={{ width: size || '100%', height: size || '100%' }}
                />
                <div

                    className="shadow"
                    style={{
                        backgroundImage: `url(${img})`,
                        display: show || size ? 'block' : 'none',
                    }}

                >
                </div>
            </div>
        </div>
    )
}
