import { useState } from 'react'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { VolumeSlider } from '../../Volume'
import { svgList } from './svgList.tsx'

interface Props {
    audioRef: HTMLAudioElement | null
    volume: number
    setVolume: (volume: number) => void
    musicList: boolean[]
    setMusicList: (musicList: boolean[]) => void
}

export function RightControlButtons(props: Props) {
    const { audioRef, volume, setVolume, musicList, setMusicList } = props
    const [temporaryVolume, setTemporaryVolume] = useState(0)
    const functions = [
        {
            title: '播放列表',
            meth: () => {
            },
            style: {},
            icon: svgList.playList,
        },
        {
            title: '循环播放',
            meth: () => {
                setMusicList(musicList.map((item, index) => index === 1 ? !item : item))
            },
            style: { color: musicList[1] ? 'white' : '#335eea' },
            icon: svgList.loopPlayback,
        },
        {
            title: '随机播放',
            meth: () => {
                setMusicList(musicList.map((item, index) => index === 2 ? !item : item))
            },
            style: { color: musicList[2] ? 'white' : '#335eea' },
            icon: svgList.randomPlay,
        },
    ]
    const volumnLogo = [
        {
            style: { display: volume === 0 ? '' : 'none' },
            icon: svgList.volumeOne,
            meth: () => {
                if (audioRef) {
                    setVolume(temporaryVolume)
                }
            },
        },
        {
            style: { display: (volume <= 0.5 && volume !== 0) ? '' : 'none' },
            icon: svgList.volumeTwo,
            meth: () => {
                if (audioRef) {
                    setTemporaryVolume(volume)
                }

                setVolume(0)
            },
        },
        {
            style: { display: volume > 0.5 ? '' : 'none' },
            icon: svgList.volumeThree,
            meth: () => {
                if (audioRef) {
                    setTemporaryVolume(volume)
                }

                setVolume(0)
            },
        },
    ]
    return (
        <div className="right-control-buttons">
            <div className="blank"></div>
            <div className="container">
                {
                    functions.map((item, index) => (
                        <ButtonIcon
                            key={index}
                            title={item.title}
                            onClick={item.meth}
                            sty={item.style}
                        >
                            <SvgIcon>
                                {item.icon}
                            </SvgIcon>
                        </ButtonIcon>
                    ))
                }
                <div className="volume-control">
                    {
                        volumnLogo.map((item, index) => (
                            <ButtonIcon
                                key={index}
                                title="静音"
                                onClick={item.meth}
                                sty={item.style}
                            >
                                <SvgIcon>
                                    {item.icon}
                                </SvgIcon>
                            </ButtonIcon>
                        ))
                    }
                    <div
                        className="volume-bar"
                    >
                        <VolumeSlider
                            volume={volume}
                            setVolume={setVolume}
                            min={0}
                            max={1}
                            interval={0.01}
                        />
                    </div>
                </div>

                <ButtonIcon
                    sty={{ marginLeft: '12px' }}
                    title="歌词"
                >
                    <SvgIcon>
                        {svgList.lyric}
                    </SvgIcon>
                </ButtonIcon>
            </div>
        </div>
    )
}
