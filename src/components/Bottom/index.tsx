import type { SongType } from '../../type'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { CountDemo, IsPlayingDemo, SongList } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { CustomSlider } from '../Bar'
import { LeftBottom } from './LeftBottom'
import { MiddleControlButtons } from './MiddleControlButtons'
import { RightControlButtons } from './RightControlButtons'
import '../../assets/css/slider.css'
import './index.less'

export function Player() {
    const [song] = useAtom<Array<SongType>>(SongList)
    const [musicList, setMusicList] = useState([true, true, true, true])
    const [count, setCount] = useAtom(CountDemo)
    const [player, setPlayer] = useState({
        progress: 0,
        currentTrackDuration: 100,
    })
    const [volume, setVolume] = useState(0.7) // 默认音量0.5
    const [temporaryVolume, setTemporaryVolume] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useAtom(IsPlayingDemo)

    const loadSong = (index: number, songList: SongType[]) => {
        if (audioRef.current && songList[index]) {
            audioRef.current.src = songList[index].song
            audioRef.current.load()
            // 处理元数据加载完成,实现播放前即可点击拖拽进度条
            const handleLoadedMetadata = () => {
                setPlayer(prev => ({
                    ...prev,
                    currentTrackDuration: audioRef.current?.duration || 100,
                }))
            }
            audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
        }
    }
    // 播放功能
    const playSong = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            }
            else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true)
                    })
                    .catch((error) => {
                        console.error('播放出错:', error)
                        setIsPlaying(false)
                    })
            }
        }
    }
    const formatTrackTime = (value: number) => {
        return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
    }
    // 初始设置音量以及更新音量
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current
            audio.volume = volume
            const updateProgress = () => {
                if (audio.duration) {
                    setPlayer({
                        progress: audio.currentTime,
                        currentTrackDuration: audio.duration,
                    })
                }
            }
            // 添加事件监听
            audio.addEventListener('timeupdate', updateProgress)
            return () => {
                audio.removeEventListener('timeupdate', updateProgress)
            }
        }
    }, [audioRef.current, count])
    // 播放列表和歌曲索引变化
    useEffect(() => {
        if (count >= song.length) {
            setCount(Math.max(0, song.length - 1))
            return
        }
        if (song.length === 0) {
            setIsPlaying(false)
            return
        }
        loadSong(count, song)
        // 如果当前状态是播放中，则自动播放新加载的歌曲
        if (isPlaying && audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true)
                })
                .catch((error) => {
                    console.error('自动播放新歌曲出错:', error)
                    setIsPlaying(false)
                })
        }
    }, [count, song])

    useEffect(() => {
        // 创建一个事件处理函数引用，以便能正确移除
        const handlePlaySong = () => playSong()
        eventBus.on('play-song', handlePlaySong)
        return () => {
            eventBus.off('play-song', handlePlaySong)
        }
    }, [isPlaying])

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current
            // 音频播放结束事件处理函数,实现各种播放模式
            const handleEnded = () => {
                setIsPlaying(false)
                if (!musicList[1]) {
                    audio.currentTime = 0
                    audio.play()
                        .then(() => setIsPlaying(true))
                        .catch(err => console.error('重新播放失败:', err))
                }
                else if (!musicList[2]) {
                    const randomIndex = Math.floor(Math.random() * song.length)
                    if (randomIndex !== count) {
                        setIsPlaying(true)
                        setCount(randomIndex)
                    }
                    else {
                        audio.currentTime = 0
                        audio.play()
                            .then(() => setIsPlaying(true))
                            .catch(err => console.error('重新播放失败:', err))
                    }
                }
                else {
                    if (count < song.length - 1) {
                        setIsPlaying(true)
                        setCount(count + 1)
                    }
                    else {
                        setIsPlaying(true)
                        setCount(0)
                    }
                }
            }
            // 添加ended事件监听器
            audio.addEventListener('ended', handleEnded)
            return () => {
                audio.removeEventListener('ended', handleEnded)
            }
        }
    }, [audioRef.current, count, musicList, song])

    return (
        <div className="player">
            <audio ref={audioRef} />
            <div
                className="progress-bar"
            >

                <CustomSlider
                    player={player}
                    setPlayer={setPlayer}
                    formatTrackTime={formatTrackTime}
                    audioRef={audioRef.current}
                />
            </div>
            <div className="controls">
                <LeftBottom></LeftBottom>
                <MiddleControlButtons></MiddleControlButtons>
                <RightControlButtons
                    audioRef={audioRef.current}
                    volume={volume}
                    setVolume={setVolume}
                    temporaryVolume={temporaryVolume}
                    setTemporaryVolume={setTemporaryVolume}
                    musicList={musicList}
                    setMusicList={setMusicList}
                >
                </RightControlButtons>
            </div>
        </div>
    )
}
