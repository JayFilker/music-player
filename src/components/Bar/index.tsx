import React, { useEffect, useRef, useState } from 'react'
import './index.less' // 你需要创建对应的CSS文件

interface PlayerState {
    progress: number
    currentTrackDuration: number
}

interface SliderProps {
    player: PlayerState
    setPlayer: (player: PlayerState) => void
    formatTrackTime: (value: number) => string
    audioRef: HTMLAudioElement | null
}

export const CustomSlider: React.FC<SliderProps> = ({ player, setPlayer, formatTrackTime, audioRef }) => {
    const [isDragging, setIsDragging] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const updateProgressFromClientX = (clientX: number) => {
        if (!sliderRef.current)
            return

        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        const offsetX = clientX - rect.left

        // 计算百分比位置
        let percentage = (offsetX / sliderWidth) * 100
        percentage = Math.max(0, Math.min(100, percentage))

        if (audioRef) {
            // 更新进度值
            setPlayer({
                ...player,
                progress: percentage / 100 * player.currentTrackDuration,
            })
            audioRef.currentTime = percentage / 100 * player.currentTrackDuration
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging)
            return

        updateProgressFromClientX(e.clientX)
    }

    const handleMouseUp = () => {
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
                if (!sliderRef.current)
                    return

                setIsDragging(true)
                updateProgressFromClientX(e.clientX)

                // 防止拖动选中文本
                e.preventDefault()
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
