import { useAtom } from 'jotai/index'
import { useEffect, useRef, useState } from 'react'
import { Device, IsPlayingDemo, PlayerDemo } from '../../store/store'
import 'vscode-codicons/dist/codicon.css'
import './index.less'

// import { ipcRenderer } from 'electron';
const ipcRenderer = window.require?.('electron')?.ipcRenderer

export function TopSpace() {
    const [small, setSmall] = useState(false)
    const [deviceId] = useAtom(Device)
    const lastUpdateTimeRef = useRef(Date.now())
    const [isDragging] = useState(false)
    const [, setPlayer] = useAtom(PlayerDemo)
    const [isPlaying] = useAtom(IsPlayingDemo)
    const logo = [
        {
            className: 'button minimize codicon codicon-chrome-minimize',
            methodName: 'minimize',
        },
        {
            className: `button max-restore codicon ${small ? 'codicon-chrome-restore' : 'codicon-chrome-maximize'}`,
            methodName: 'maximizeOrUnmaximize',
        },
        {
            className: 'button close codicon codicon-chrome-close',
            methodName: 'close',
        },
    ]
    const getToken = () => localStorage.getItem('spotify_access_token') as string
    const updatePlayerState = async () => {
        const response = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
        if (response.status === 204) {
            console.log('当前没有活动的播放设备')
            return
        }
        const data = await response.json()
        if (data) {
            setPlayer({
                progress: Math.floor(data.progress_ms / 1000) || 0,
                currentTrackDuration: Math.floor(data.item?.duration_ms / 1000) || 0,
            })
        }
    }
    useEffect(() => {
        if (!deviceId)
            return
        updatePlayerState()
        lastUpdateTimeRef.current = Date.now()
        const progressInterval = setInterval(() => {
            if (isPlaying && !isDragging) { // 添加!isDragging条件
                const now = Date.now()
                const elapsedSec = (now - lastUpdateTimeRef.current) / 1000
                lastUpdateTimeRef.current = now

                setPlayer(prev => ({
                    ...prev,
                    progress: Math.min(prev.progress + elapsedSec, prev.currentTrackDuration),
                }))
            }
        }, 33)
        const syncInterval = setInterval(() => {
            if (isPlaying) { // 同步前先记录当前时间
                lastUpdateTimeRef.current = Date.now()
                updatePlayerState()
            }
        }, 5000)
        return () => {
            clearInterval(progressInterval)
            clearInterval(syncInterval)
        }
    }, [deviceId, isPlaying])
    return (
        <div className="win32-titlebar">
            <div className="title"> MyYesPlayMusic</div>
            <div className="controls" style={{ padding: '0 0' }}>
                {
                    logo.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={item.className}
                                onClick={() => {
                                    // eslint-disable-next-line ts/no-unused-expressions
                                    index === 1 ? setSmall(!small) : ''
                                    try {
                                        ipcRenderer.send(item.methodName)
                                    }
                                    catch {
                                        // eslint-disable-next-line no-alert
                                        alert('此功能为Electron专属，浏览器环境不可用，请直接用浏览器自带的')
                                    }
                                }}
                            >
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
