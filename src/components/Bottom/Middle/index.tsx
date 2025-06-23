import type { SongType } from '../../../types'
import { useAtom } from 'jotai/index'
import { useRef } from 'react'
import {
    CountDemo,
    CurrentSongList,
    Device,
    FirstPlay,
    IsPlayingDemo,
    IsPlayingDemoTwo,
    Link,
    MusicList,
    PlayerDemo,
    SetDemo,
    ShowLyrics,
    SongList,
    Volume,
} from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { svgListTwo } from '../MiddleControlButtons/svg.tsx'
import { MiddleTwo } from '../MiddleTwo'

export function Middle(props: any) {
    const { lyrics, playTrack } = props
    const [, setShowLyrics] = useAtom(ShowLyrics)
    const [musicList, setMusicList] = useAtom(MusicList)
    const [volume, setVolume] = useAtom(Volume) // 默认音量0.5
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [set] = useAtom(SetDemo)
    const [player, setPlayer] = useAtom(PlayerDemo)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [linkDemo] = useAtom(Link)
    const [count, setCount] = useAtom(CountDemo)
    const [song] = useAtom<Array<SongType>>(SongList)
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [firstPlay, setFirstPlay] = useAtom(FirstPlay)
    const [deviceId] = useAtom(Device)
    const [isPlaying] = useAtom(IsPlayingDemo)
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
            icon: svgListTwo.disLike,
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
            icon: svgListTwo.previous,
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
            icon: svgListTwo.play,
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
            icon: svgListTwo.stopPlay,
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
            icon: svgListTwo.next,
        },
    ]
    return (
        <MiddleTwo
            lyrics={lyrics}
            playTrack={playTrack}
            audioRef={audioRef}
            volume={volume}
            setVolume={setVolume}
            musicList={musicList}
            setMusicList={setMusicList}
            player={player}
            setPlayer={setPlayer}
            Logo={Logo}
            setShowLyrics={setShowLyrics}
            setIsPlayingTwo={setIsPlayingTwo}
            set={set}
        >
        </MiddleTwo>
    )
}
