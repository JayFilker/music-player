import type { SpotifyPlayer } from '../../types/spotify'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { CountDemo, CurrentSongList, Device, IsPlayingDemo, PlayerDemo } from '../../store/store.ts'
import { CustomSlider } from '../Bar'
import { LeftBottom } from './LeftBottom'
import { MiddleControlButtons } from './MiddleControlButtons'
import { RightControlButtons } from './RightControlButtons'
import '../../assets/css/slider.css'
import './index.less'

export function Player() {
    const [musicList, setMusicList] = useState([true, true, true, true])
    const [count, setCount] = useAtom(CountDemo)
    const [player, setPlayer] = useAtom(PlayerDemo)
    const [volume, setVolume] = useState(0.7) // 默认音量0.5
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [, setIsPlaying] = useAtom(IsPlayingDemo)
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [playerSdk, setPlayerSdk] = useState<SpotifyPlayer | null>(null)
    const [deviceId, setDeviceId] = useAtom(Device)
    const getToken = () => localStorage.getItem('spotify_access_token') as string
    const [prevTime, setPrevTime] = useState(0)
    const playTrack = async (trackUri: string) => {
        if (!deviceId) {
            return '失败'
        }
        try {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: [trackUri],
                }),
            })
            console.log('现在播放:', trackUri)
            setIsPlaying(true)
        }
        catch (error) {
            console.error('播放失败:', error)
        }
    }
    const reconnectSdk = () => {
        if (playerSdk) {
            playerSdk.disconnect()
            setTimeout(() => playerSdk.connect(), 100)
        }
    }
    const getRefreshToken = async () => {
        const refreshToken = localStorage.getItem('spotify_refresh_token') as string
        const response = await fetch(`http://localhost:3000/refresh_token?refresh_token=${encodeURIComponent(refreshToken)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        localStorage.setItem('spotify_refresh_token', data.refresh_token)
        localStorage.setItem('spotify_access_token', data.access_token)
    }
    useEffect(() => {
        if ((player.currentTrackDuration - player.progress < 1) && (Date.now() - prevTime > 1000)) {
            setPrevTime(Date.now())
            if (!musicList[1]) {
                playTrack(currentSong.items[count].uri)
            }
            else if (!musicList[2]) {
                const randomIndex = Math.floor(Math.random() * currentSong.items.length)
                setCount(randomIndex)
                playTrack(currentSong.items[randomIndex].uri)
            }
            else {
                if (count !== currentSong.items.length - 1) {
                    setCount(count + 1)
                    playTrack(currentSong.items[count + 1].uri)
                }
                else {
                    setCount(0)
                    playTrack(currentSong.items[0].uri)
                }
            }
        }
    }, [player.currentTrackDuration, player.progress])
    useEffect(() => { // 初始化
        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true
        document.body.appendChild(script)
        const originalCallback = window.onSpotifyWebPlaybackSDKReady
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb) => {
                    cb(getToken())
                },
                volume: 0.7,
            })
            setPlayerSdk(player)
            player.addListener('ready', (e: any) => {
                setDeviceId(e.device_id)
            })
            player.addListener('not_ready', (e: any) => {
                setDeviceId(e.device_id)
                reconnectSdk()
            })
            player.addListener('authentication_error', (e: any) => {
                console.error('认证失败:', e.message)// 刷新令牌并重新连接
                getRefreshToken().then(() => {
                    reconnectSdk()
                })
            })
            player.connect()
        }
        return () => { // 安全地移除脚本，先查找确认存在再移除
            const scriptElement = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')
            if (scriptElement && document.body.contains(scriptElement)) {
                document.body.removeChild(scriptElement)
            } // 清理Spotify SDK
            if (playerSdk) {
                playerSdk.disconnect()
                playerSdk.removeListener('ready')
                playerSdk.removeListener('not_ready')
                playerSdk.removeListener('authentication_error')
            }
            if (typeof originalCallback === 'function') {
                window.onSpotifyWebPlaybackSDKReady = originalCallback
            }
            else { // 如果没有原始回调，可以使用空函数代替null
                window.onSpotifyWebPlaybackSDKReady = function () {
                }
            }
        }
    }, [])
    return (
        <div className="player">
            <audio ref={audioRef} />
            <div
                className="progress-bar"
            >
                <CustomSlider
                    player={player}
                    setPlayer={setPlayer}
                />
            </div>
            <div className="controls">
                <LeftBottom playTrack={playTrack}></LeftBottom>
                <MiddleControlButtons>
                </MiddleControlButtons>
                <RightControlButtons
                    audioRef={audioRef.current}
                    volume={volume}
                    setVolume={setVolume}
                    musicList={musicList}
                    setMusicList={setMusicList}
                >
                </RightControlButtons>
            </div>
        </div>
    )
}
