import { useAtom } from 'jotai'
import { useEffect } from 'react'
import {
    Active,
    CountDemo,
    CurrentSongList,
    Device,
    FirstPlay,
    IsPlayingDemo,
    IsPlayingDemoTwo,
    Link,
    Volume,
} from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'

export function ShortKey() {
    const [active] = useAtom(Active)
    const [count, setCount] = useAtom(CountDemo)
    const [firstPlay, setFirstPlay] = useAtom(FirstPlay)
    const [deviceId] = useAtom(Device)
    const [isPlaying] = useAtom(IsPlayingDemo)
    const [linkDemo] = useAtom(Link)
    const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [volume, setVolume] = useAtom(Volume)
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            // 忽略输入框中的按键事件
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return
            }

            // 获取当前按下的修饰键状态
            const modifiers = {
                ctrl: e.ctrlKey,
                alt: e.altKey,
                shift: e.shiftKey,
            }

            // 获取主键
            const key = e.key

            // 检查是否匹配普通快捷键
            for (let i = 0; i < active.length; i++) {
                // 解析快捷键字符串
                const shortKeyParts = active[i].shortKey.split(' + ')

                // 检查修饰键是否匹配
                const hasCtrl = shortKeyParts.includes('Control') === modifiers.ctrl
                const hasAlt = shortKeyParts.includes('Alt') === modifiers.alt
                const hasShift = shortKeyParts.includes('Shift') === modifiers.shift

                const shortKeyPartsDemo = shortKeyParts.filter(shortKeyPart => shortKeyPart !== 'Alt' && shortKeyPart !== 'Control' && shortKeyPart !== 'Shift')
                // console.log(shortKeyPartsDemo)
                // 检查主键是否匹配（考虑箭头键的特殊情况）
                let mainKeyMatches = false
                if (shortKeyParts.includes('→') && key === 'ArrowRight') {
                    mainKeyMatches = true
                }
                else if (shortKeyParts.includes('←') && key === 'ArrowLeft') {
                    mainKeyMatches = true
                }
                else if (shortKeyParts.includes('↑') && key === 'ArrowUp') {
                    mainKeyMatches = true
                }
                else if (shortKeyParts.includes('↓') && key === 'ArrowDown') {
                    mainKeyMatches = true
                }
                else if (shortKeyPartsDemo.includes(key)) {
                    mainKeyMatches = true
                }

                // 如果所有条件都匹配，触发对应功能
                if (hasCtrl && hasAlt && hasShift && mainKeyMatches) {
                    e.preventDefault() // 阻止默认行为
                    if (i === 0) {
                        if (linkDemo) {
                            setIsPlayingTwo(!isPlaying)
                        }
                        console.log(isPlaying)

                        if (isPlaying) {
                            // @ts-ignore
                            eventBus.emit('play-stop')
                        }
                        else {
                            if (firstPlay) {
                                if (deviceId) {
                                    // @ts-ignore
                                    eventBus.emit('play-track', currentSong?.items?.[count]?.uri)
                                    setFirstPlay(false)
                                }
                            }
                            else {
                                // @ts-ignore
                                eventBus.emit('play-track')
                            }
                        }
                    }
                    else if (i === 1) {
                        if (count !== currentSong.items.length - 1) {
                            setCount(count + 1)
                            // @ts-ignore
                            eventBus.emit('play-track', currentSong?.items?.[count + 1]?.uri)
                        }
                    }
                    else if (i === 2) {
                        if (count !== 0) {
                            setCount(count - 1)
                            // @ts-ignore
                            eventBus.emit('play-track', currentSong?.items?.[count - 1]?.uri)
                        }
                    }
                    else if (i === 3) {
                        setVolume(volume + 0.1)
                    }
                    else if (i === 4) {
                        setVolume(volume - 0.1)
                    }
                    return
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [active, isPlaying, currentSong, count, volume])
    return (<></>)
}
