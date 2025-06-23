import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { CountDemo, CurrentAlum, CurrentSongList, ShowLyrics, TemporaryVolume } from '../../../store/store.ts'
import { CustomSlider } from '../../Bar'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { VolumeSlider } from '../../Volume'
import { svgList } from '../RightControlButtons/svgList.tsx'
import { lyricsButtomSvg } from './lyricsButtomSvg.tsx'
import './index.less'

export function LyricsButtom(props: any) {
    const { audioRef, volume, setVolume, player, setPlayer, Logo, functions } = props
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [, setShowLyrics] = useAtom(ShowLyrics)
    const [count] = useAtom(CountDemo)
    const [temporaryVolume, setTemporaryVolume] = useAtom(TemporaryVolume)
    const volumnLogo = [
        {
            style: { display: volume === 0 ? '' : 'none' },
            icon: svgList.volumeOne,
            meth: () => {
                if (currentSong?.items?.length > 0) {
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
    const navigate = useNavigate()
    const [currentAlbum] = useAtom<any>(CurrentAlum)
    const formatTrackTime = (value: number) => {
        return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
    }
    const formatTrackTimeTwo = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }

    return (
        <div className="controls" style={{ padding: '0 0' }}>
            <div className="top-part">
                <div className="track-info">
                    <div title={currentSong?.items?.[count]?.name} className="title">
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault()
                                setShowLyrics(false)
                                navigate(`/playsList?id=${currentAlbum?.album?.id}&type=albums`)
                            }}
                        >
                            {currentSong?.items?.[count]?.name}
                        </a>
                    </div>
                    <div className="subtitle">
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault()
                                setShowLyrics(false)
                                navigate(`/artist?id=${currentSong?.items?.[count]?.artists?.[0]?.id}`)
                            }}
                        >
                            {currentSong?.items?.[count]?.artists?.[0]?.name}
                        </a>
                        <span v-if="album.id !== 0">
                            -
                            <a
                                href=""
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowLyrics(false)
                                    navigate(`/playsList?id=${currentAlbum?.album?.id}&type=albums`)
                                }}
                            >
                                {currentSong?.items?.[count]?.album ? currentSong?.items?.[count]?.album?.name : currentSong?.items?.[count]?.name}
                            </a>
                        </span>
                    </div>
                </div>
                <div className="top-right">
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
                        <div className="volume-bar">
                            <VolumeSlider
                                min={0}
                                max={1}
                                interval={0.01}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <ButtonIcon>
                            <SvgIcon>
                                {lyricsButtomSvg.like}
                            </SvgIcon>
                        </ButtonIcon>
                        <ButtonIcon>
                            <SvgIcon>
                                {lyricsButtomSvg.add}
                            </SvgIcon>
                        </ButtonIcon>
                    </div>
                </div>
            </div>
            <div className="progress-bar">
                <span>
                    {' '}
                    {formatTrackTime(player.progress)}
                </span>
                <CustomSlider
                    player={player}
                    setPlayer={setPlayer}
                    lyrics={true}
                />
                <span>{formatTrackTimeTwo(currentSong?.items?.[count]?.duration_ms)}</span>
            </div>
            <div className="media-controls">
                <ButtonIcon
                    title={functions[1].title}
                    onClick={functions[1].meth}

                >
                    <SvgIcon sty={functions[1].style}>
                        {functions[1].icon}
                    </SvgIcon>
                </ButtonIcon>
                <div className="middle">
                    {
                        Logo.map((item: any, index: any) => {
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
                <ButtonIcon
                    title={functions[2].title}
                    onClick={functions[2].meth}
                >
                    <SvgIcon sty={functions[2].style}>
                        {functions[2].icon}
                    </SvgIcon>
                </ButtonIcon>
            </div>
        </div>
    )
}
