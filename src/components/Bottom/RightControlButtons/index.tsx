import { useAtom } from 'jotai'
// import { useNavigate } from 'react-router-dom'
import { TemporaryVolume } from '../../../store/store.ts'
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
    setShowLyrics: (showLyrics: boolean) => void
    functions: Array<object>
}

export function RightControlButtons(props: Props) {
    const { audioRef, volume, setVolume, setShowLyrics, functions } = props
    const [temporaryVolume, setTemporaryVolume] = useAtom(TemporaryVolume)
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
                    console.log(volume)
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
                    functions.map((item: any, index: number) => (
                        <ButtonIcon
                            key={index}
                            title={item.title}
                            onClick={item.meth}
                        >
                            <SvgIcon sty={item.style}>
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
                            min={0}
                            max={1}
                            interval={0.01}
                        />
                    </div>
                </div>

                <ButtonIcon
                    sty={{ marginLeft: '12px' }}
                    title="歌词"
                    onClick={() => {
                        setShowLyrics(true)
                    }}
                >
                    <SvgIcon>
                        {svgList.lyric}
                    </SvgIcon>
                </ButtonIcon>
            </div>
        </div>
    )
}
