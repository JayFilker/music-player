import { useAtom } from 'jotai'
import { useState } from 'react'
import { badLike, countDemo, isPlayingDemo, isPlayingDemoTwo, link, songList } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { SvgIcon } from '../SvgIcon'
import './index.less'

export function SongListImg(props: {
    img: string
    content: Array<{
        title: string
        artist: Array<string>
        imgPic: string
        song: string
        from: string
    }>
}) {
    const { img, content } = props
    const [, setCount] = useAtom(countDemo)
    const [, setBadLikeDemo] = useAtom(badLike)
    const [, setIsPlayingTwo] = useAtom(isPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(link)
    const [, setSong] = useAtom(songList)
    const [isPlaying] = useAtom(isPlayingDemo)
    const [show, setShow] = useState<boolean>(false)
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
                            setSong(content)
                            setCount(0)
                            setTimeout(() => {
                                if (!isPlaying) {
                                    eventBus.emit('play-song', { id: 0 })
                                }
                            }, 0)
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
                {/* :src="imageUrl" :style="imageStyles" */}
                {/* <transition v-if="coverHover || alwaysShowShadow" name="fade"> */}
                <div

                    className="shadow"
                    style={{
                        backgroundImage: `url(${img})`,
                        display: show ? 'block' : 'none',
                    }}

                >
                </div>
                {/* :style="shadowStyles" */}
                {/* </transition> */}
            </div>
        </div>
    )
}
