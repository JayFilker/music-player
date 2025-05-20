import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { BadLike, CountDemo, CurrentSongList, IsPlayingDemoTwo, Link } from '../../store/store.ts'
import eventBus from '../../utils/eventBus'
import { SvgIcon } from '../SvgIcon'
import './index.less'

export function SongListImg(props: {
    img: string
    id: string
    number?: number
    index: number
}) {
    const { img, id, index, number } = props
    const [, setCount] = useAtom(CountDemo)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [show, setShow] = useState<boolean>(false)
    const initTwo = async (id: string, play?: any) => {
        const tokenOne = localStorage.getItem('spotify_access_token')
        const albumId = id
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: { Authorization: `Bearer ${tokenOne}` },
        })
        const tracksData = await response.json()
        setCount(0)
        setCurrentSong({ ...tracksData, imgPic: img })
        if (play) {
            // @ts-ignore
            eventBus.emit('play-track', tracksData?.items[0].uri)
        }
    }

    useEffect(() => {
        if (number === 0 && index === 0) {
            initTwo(id)
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
        >
            <div className="cover-container">
                <div className="shade">
                    <button
                        // v-show="focus"
                        className="play-button"
                        style={{
                            display: show ? 'block' : 'none',
                        }}

                        onClick={() => {
                            setLinkDemo(false)
                            setBadLikeDemo(false)
                            setIsPlayingTwo(false)
                            initTwo(id, index + 1)
                        }}
                    >
                        <SvgIcon>
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
                />
                <div

                    className="shadow"
                    style={{
                        backgroundImage: `url(${img})`,
                        display: show ? 'block' : 'none',
                    }}

                >
                </div>
            </div>
        </div>
    )
}
