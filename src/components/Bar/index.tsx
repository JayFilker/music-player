import { useAtom } from 'jotai/index'
import React, { useEffect, useRef, useState } from 'react'
import { Device, StopUpdateBar } from '../../store/store' // 你需要创建对应的CSS文件
import './index.less'

interface PlayerState {
    progress: number
    currentTrackDuration: number
}

interface SliderProps {
    player: PlayerState
    setPlayer: (player: PlayerState) => void
    audioRef?: HTMLAudioElement | null
}

export const CustomSlider: React.FC<SliderProps> = ({ player, setPlayer }) => {
    const [isDragging, setIsDragging] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [deviceId] = useAtom(Device)
    const lastUpdateTimeRef = useRef(Date.now())
    const formatTrackTime = (value: number) => {
        return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
    }
    const [, setStopUpdateBar] = useAtom(StopUpdateBar)
    const updateProgressFromClientX = (clientX: number) => {
        if (!sliderRef.current)
            return
        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        const offsetX = clientX - rect.left
        // 计算百分比位置
        let percentage = (offsetX / sliderWidth) * 100
        percentage = Math.max(0, Math.min(100, percentage))
        // 更新进度值
        setPlayer({
            ...player,
            progress: percentage / 100 * player.currentTrackDuration,
        })
        // seekToPosition(percentage / 100 * player.currentTrackDuration)
        return percentage / 100 * player.currentTrackDuration
    }
    const getToken = () => localStorage.getItem('spotify_access_token') as string
    const seekToPosition = async (positionSec: number) => {
        if (!deviceId)
            return
        try {
            const positionMs = Math.floor(positionSec * 1000)
            setPlayer({
                ...player,
                progress: positionSec,
            })
            lastUpdateTimeRef.current = Date.now()
            await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${getToken()}` },
            })
        }
        catch (error) {
            console.error('调整进度失败:', error)
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging)
            return

        updateProgressFromClientX(e.clientX)
    }

    const handleMouseUp = (e: { clientX: number }) => {
        const percentage = updateProgressFromClientX(e.clientX)
        if (percentage) {
            seekToPosition(percentage)
            setTimeout(() => {
                setStopUpdateBar(false)
            }, 1000) // 延时1秒恢复更新
        }
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    return (
        <div
            className="vue-slider vue-slider-ltr"
            style={{ padding: '6px 0', width: 'auto', height: '2px' }}
            ref={sliderRef}
            onMouseDown={(e) => {
                // 防止拖动选中文本
                e.preventDefault()
                if (!sliderRef.current)
                    return
                setStopUpdateBar(true)
                setIsDragging(true)
                updateProgressFromClientX(e.clientX)
            }}

        >
            <div className="vue-slider-rail">
                <div
                    className="vue-slider-process"
                    style={{
                        height: '100%',
                        top: '0px',
                        left: '0%',
                        width: `${(player.progress / player.currentTrackDuration) * 100}%`,
                        transitionProperty: 'width, left',
                        transitionDuration: '0s',
                    }}
                >
                </div>
                <div
                    className="vue-slider-dot vue-slider-dot-hover"
                    role="slider"
                    aria-valuenow={(player.progress / player.currentTrackDuration) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-orientation="horizontal"
                    tabIndex={0}
                    style={{
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: `${(player.progress / player.currentTrackDuration) * 100}%`,
                        transition: isDragging ? 'none' : 'left 0s ease 0s',
                    }}
                    onMouseEnter={() => {
                        setShowTooltip(true)
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false)
                    }}
                >
                    <div className="vue-slider-dot-handle"></div>
                    {showTooltip && (
                        <div className="vue-slider-dot-tooltip ">
                            <div className="vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-top">
                                <span className="vue-slider-dot-tooltip-text">
                                    {formatTrackTime(player.progress)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
