import React, { useEffect, useRef, useState } from 'react'
import '../Bar/index.less'

// 复用之前的CSS样式
interface VolumeSliderProps {
    volume: number
    setVolume: (volume: number) => void
    min?: number
    max?: number
    interval?: number
    audioRef?: HTMLAudioElement | null
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
    volume,
    setVolume,
    min = 0,
    max = 1,
    interval = 0.01,
    audioRef,
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    // 计算百分比值，用于CSS显示
    const getPercentage = () => ((volume - min) / (max - min)) * 100
    const updateVolumeFromClientX = (clientX: number) => {
        if (!sliderRef.current)
            return

        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        const offsetX = clientX - rect.left

        // 计算百分比位置
        let percentage = (offsetX / sliderWidth)
        percentage = Math.max(0, Math.min(1, percentage))

        // 根据间隔计算实际值
        const rawValue = min + percentage * (max - min)
        const roundedValue = Math.round(rawValue / interval) * interval
        const finalValue = Math.max(min, Math.min(max, roundedValue))

        // 更新音量值
        setVolume(Number.parseFloat(finalValue.toFixed(2))) // 保留两位小数
        if (audioRef) {
            audioRef.volume = Number.parseFloat(finalValue.toFixed(2))
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging)
            return
        updateVolumeFromClientX(e.clientX)
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
            style={{ padding: '6px 0', width: 'auto', height: '4px' }}
            ref={sliderRef}
            onMouseDown={(e) => {
                if (!sliderRef.current)
                    return

                setIsDragging(true)
                updateVolumeFromClientX(e.clientX)
            }}
        >
            <div className="vue-slider-rail">
                <div
                    id="volume-left"
                    className="vue-slider-process "
                    style={{
                        height: '100%',
                        top: '0px',
                        left: '0%',
                        width: `${getPercentage()}%`,
                        transitionProperty: 'width, left',
                        transitionDuration: '0s',
                    }}
                >
                </div>
                <div
                    className="vue-slider-dot"
                    role="slider"
                    aria-valuenow={volume}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-orientation="horizontal"
                    tabIndex={0}
                    style={{
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: `${getPercentage()}%`,
                        transition: isDragging ? 'none' : 'left 0s ease 0s',
                    }}
                >
                    <div className="vue-slider-dot-handle"></div>
                    {/* 不显示tooltip */}
                </div>
            </div>
        </div>
    )
}
