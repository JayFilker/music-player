import { useNavigate } from 'react-router-dom'
import { CustomSlider } from '../../Bar'
import { ShortKey } from '../../ShortKey'
import { LeftBottom } from '../LeftBottom'
import { LyricsButtom } from '../LyricsButtom'
import { MiddleControlButtons } from '../MiddleControlButtons'
import { RightControlButtons } from '../RightControlButtons'
import { svgList } from '../RightControlButtons/svgList.tsx'

export function MiddleTwo(props: any) {
    const {
        lyrics,
        playTrack,
        audioRef,
        volume,
        setVolume,
        musicList,
        setMusicList,
        player,
        setPlayer,
        Logo,
        setShowLyrics,
        setIsPlayingTwo,
        set,
    } = props
    const navigate = useNavigate()
    const functions = [
        {
            title: '播放列表',
            meth: () => {
                if (musicList[0]) {
                    navigate('/nextTracks')
                }
                else {
                    navigate(-1)
                }
                setMusicList(musicList.map((item: any, index: any) => index === 0 ? !item : item))
            },
            style: { color: musicList[0] ? 'white' : '#335eea' },
            icon: svgList.playList,
        },
        {
            title: '循环播放',
            meth: () => {
                setMusicList(musicList.map((item: any, index: number) => index === 1 ? !item : item))
            },
            style: { color: musicList[1] ? 'white' : '#335eea', opacity: 1 },
            icon: svgList.loopPlayback,
        },
        {
            title: '随机播放',
            meth: () => {
                setMusicList(musicList.map((item: any, index: number) => index === 2 ? !item : item))
            },
            style: { color: musicList[2] ? 'white' : '#335eea', opacity: 1 },
            icon: svgList.randomPlay,
        },
    ]

    return (
        <>
            {lyrics
                ? (
                        <LyricsButtom
                            audioRef={audioRef.current}
                            volume={volume}
                            setVolume={setVolume}
                            musicList={musicList}
                            setMusicList={setMusicList}
                            setShowLyrics={setShowLyrics}
                            player={player}
                            setPlayer={setPlayer}
                            setIsPlayingTwo={setIsPlayingTwo}
                            Logo={Logo}
                            functions={functions}
                        >
                        </LyricsButtom>
                    )
                : (
                        <div className="player">
                            <audio ref={audioRef} />
                            <ShortKey></ShortKey>
                            <div
                                className={`progress-bar ${set.entertainment ? 'nyancat nyancat-stop' : ''}`}
                            >
                                <CustomSlider
                                    player={player}
                                    setPlayer={setPlayer}
                                />
                            </div>
                            <div className="controls">
                                <LeftBottom playTrack={playTrack}></LeftBottom>
                                <MiddleControlButtons Logo={Logo}>
                                </MiddleControlButtons>
                                <RightControlButtons
                                    audioRef={audioRef.current}
                                    volume={volume}
                                    setVolume={setVolume}
                                    musicList={musicList}
                                    setMusicList={setMusicList}
                                    setShowLyrics={setShowLyrics}
                                    functions={functions}
                                >
                                </RightControlButtons>
                            </div>
                        </div>
                    )}
        </>
    )
}
