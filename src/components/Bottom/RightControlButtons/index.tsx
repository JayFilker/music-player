import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { VolumeSlider } from '../../Volume'
import { svgList } from './svgList.tsx'

interface Props {
    audioRef: HTMLAudioElement | null
    volume: number
    setVolume: (volume: number) => void
    temporaryVolume: number
    setTemporaryVolume: (volume: number) => void
    musicList: boolean[]
    setMusicList: (musicList: boolean[]) => void
}

export function RightControlButtons(props: Props) {
    const { audioRef, volume, setVolume, temporaryVolume, setTemporaryVolume, musicList, setMusicList } = props
    return (
        <div className="right-control-buttons">
            <div className="blank"></div>
            <div className="container">
                <ButtonIcon
                    title="播放列表"
                >
                    <SvgIcon>
                        {svgList.playList}
                    </SvgIcon>
                </ButtonIcon>
                <ButtonIcon
                    title="循环播放"
                    sty={{ color: musicList[1] ? 'white' : '#335eea' }}
                    onClick={() => {
                        setMusicList(musicList.map((item, index) => index === 1 ? !item : item))
                    }}
                >
                    <SvgIcon>
                        {svgList.loopPlayback}
                    </SvgIcon>
                </ButtonIcon>
                <ButtonIcon
                    title="随机播放"
                    sty={{ color: musicList[2] ? 'white' : '#335eea' }}
                    onClick={() => {
                        setMusicList(musicList.map((item, index) => index === 2 ? !item : item))
                    }}
                >
                    <SvgIcon>
                        {svgList.randomPlay}
                    </SvgIcon>
                </ButtonIcon>
                <div className="volume-control">
                    <ButtonIcon
                        title="静音"
                        sty={{ display: volume === 0 ? '' : 'none' }}
                        onClick={() => {
                            if (audioRef) {
                                setVolume(temporaryVolume)
                                audioRef.volume = temporaryVolume
                            }
                        }}

                    >
                        <SvgIcon>
                            {svgList.volumeOne}
                        </SvgIcon>
                    </ButtonIcon>
                    {' '}
                    <ButtonIcon
                        title="静音"
                        sty={{ display: (volume <= 0.5 && volume !== 0) ? '' : 'none' }}
                        onClick={() => {
                            if (audioRef) {
                                setTemporaryVolume(volume)
                                audioRef.volume = 0
                            }

                            setVolume(0)
                        }}
                    >
                        <SvgIcon>
                            {svgList.volumeTwo}
                        </SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon
                        title="静音"
                        sty={{ display: volume > 0.5 ? '' : 'none' }}
                        onClick={() => {
                            if (audioRef) {
                                setTemporaryVolume(volume)
                                audioRef.volume = 0
                            }

                            setVolume(0)
                        }}
                    >
                        <SvgIcon>
                            {svgList.volumeThree}
                        </SvgIcon>
                    </ButtonIcon>
                    <div
                        className="volume-bar"
                    >
                        <VolumeSlider
                            volume={volume}
                            setVolume={setVolume}
                            min={0}
                            max={1}
                            interval={0.01}
                            audioRef={audioRef}
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
