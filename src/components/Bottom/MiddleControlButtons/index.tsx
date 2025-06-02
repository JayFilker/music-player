import type { SongType } from '../../../types'
import { useAtom } from 'jotai/index'
import {
    CountDemo,
    CurrentSongList,
    Device,
    FirstPlay,
    IsPlayingDemo,
    IsPlayingDemoTwo,
    Link,
    SongList,
} from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { svgList } from './svg.tsx'

export function MiddleControlButtons() {
    const [count, setCount] = useAtom(CountDemo)
    const [firstPlay, setFirstPlay] = useAtom(FirstPlay)
    const [deviceId] = useAtom(Device)
    const [isPlaying] = useAtom(IsPlayingDemo)
    const [linkDemo] = useAtom(Link)
    const [song] = useAtom<Array<SongType>>(SongList)
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const Logo = [
        {
            title: '不喜欢',
            style: { display: linkDemo ? '' : 'none' },
            meth: () => {
                if (count !== song.length - 1) {
                    if (count !== currentSong.items.length - 1) {
                        setCount(count + 1)
                        // @ts-ignore
                        eventBus.emit('play-track', currentSong.items[count + 1].uri)
                    }
                }
            },
            icon: svgList.disLike,
        },
        {
            title: '上一首',
            style: { display: linkDemo ? 'none' : '' },
            meth: () => {
                if (count !== 0) {
                    setCount(count - 1)
                    // @ts-ignore
                    eventBus.emit('play-track', currentSong.items[count - 1].uri)
                }
            },
            icon: svgList.previous,
        },
        {
            title: '播放',
            style: {
                display: isPlaying ? 'none' : '',
            },
            meth: () => {
                if (linkDemo) {
                    setIsPlayingTwo(true)
                }
                if (firstPlay) {
                    if (deviceId) {
                        // @ts-ignore
                        eventBus.emit('play-track', currentSong.items[count].uri)
                        setFirstPlay(false)
                    }
                }
                else {
                    // @ts-ignore
                    eventBus.emit('play-track')
                }
            },
            icon: svgList.play,
        },
        {
            title: '暂停',
            style: {
                display: isPlaying ? '' : 'none',
            },
            meth: () => {
                if (linkDemo) {
                    setIsPlayingTwo(false)
                }
                // @ts-ignore
                eventBus.emit('play-stop')
            },
            icon: svgList.stopPlay,
        },
        {
            title: '下一首',
            style: {},
            meth: () => {
                if (count !== currentSong.items.length - 1) {
                    setCount(count + 1)
                    // @ts-ignore
                    eventBus.emit('play-track', currentSong.items[count + 1].uri)
                }
            },
            icon: svgList.next,
        },
    ]
    return (
        <div className="middle-control-buttons">
            <div className="blank"></div>
            <div className="container">
                {
                    Logo.map((item, index) => {
                        return (
                            <ButtonIcon
                                classname={(index === 2 || index === 3) ? 'play' : ''}
                                key={index}
                                title={item.title}
                                onClick={item.meth}
                                sty={item.style}
                            >
                                <SvgIcon>
                                    {item.icon}
                                </SvgIcon>
                            </ButtonIcon>
                        )
                    })
                }
            </div>
            <div className="blank"></div>
        </div>
    )
}
