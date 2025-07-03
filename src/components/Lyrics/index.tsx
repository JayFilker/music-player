import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useLyricsByUrl, useSearchMusic } from '../../api/lyrics.ts'
import { CountDemo, CurrentSongList, PlayerDemo, SetDemo, ShowLyrics } from '../../store/store.ts'
import { Player } from '../Bottom'
import { SvgIcon } from '../SvgIcon'
import { lyricsSvg } from './lyricsSvg.tsx'
import './index.less'

export function Lyrics() {
    const [showLyrics, setShowLyrics] = useAtom(ShowLyrics)
    const [currentSongList] = useAtom(CurrentSongList)
    const [count] = useAtom(CountDemo)
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
    const [backgroundGradient, setBackgroundGradient] = useState('')
    const [player] = useAtom(PlayerDemo)
    const [setDemo] = useAtom(SetDemo)
    const { data: music } = useSearchMusic(currentSongList?.items?.[count]?.name)
    const { data: lyricsByUrl } = useLyricsByUrl(music?.result?.[0]?.api_lyrics)

    // 创建一个随机渐变背景色函数
    function getRandomGradient() {
        // 生成随机RGB颜色
        const getRandomColor = () => {
            const r = Math.floor(Math.random() * 200) + 30 // 避免太亮或太暗
            const g = Math.floor(Math.random() * 200) + 30
            const b = Math.floor(Math.random() * 200) + 30
            return `rgb(${r}, ${g}, ${b})`
        }
        const color1 = getRandomColor()
        const color2 = getRandomColor()

        setBackgroundGradient(`linear-gradient(to left top, ${color1}, ${color2})`)
    }
    // 更新 useEffect
    useEffect(() => {
        if (showLyrics && currentSongList?.items?.[count]) {
            getRandomGradient()
        }
    }, [showLyrics, currentSongList, count])
    // // 2. 使用useEffect监听播放进度变化
    useEffect(() => {
        if (showLyrics && lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '')?.length > 0 && player?.currentTrackDuration > 0) {
            const highlightedElement = document.querySelector('.highlight')
            if (highlightedElement) {
                highlightedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
            // 计算播放进度百分比
            const progressPercent = player?.progress / player?.currentTrackDuration

            // 根据百分比计算当前应高亮的歌词行
            const newIndex = Math.min(
                Math.floor(progressPercent * lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '').length),
                lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '').length - 1,
            )
            if (newIndex !== currentLyricIndex) {
                setCurrentLyricIndex(newIndex)
            }
        }
    }, [player, lyricsByUrl, showLyrics, currentLyricIndex])
    return (
        <div className="lyrics-page" style={{ display: showLyrics ? '' : 'none' }}>
            <div
                className="gradient-background"
                style={{
                    background: setDemo.showBackGround === 'true' ? backgroundGradient : '',
                    backgroundImage: setDemo.showBackGround === 'blur' || setDemo.showBackGround === 'dynamic' ? `url(${currentSongList?.items?.[count]?.album?.images?.[0]?.url || currentSongList?.imgPic})` : 'none',
                    filter: setDemo.showBackGround === 'blur' || setDemo.showBackGround === 'dynamic' ? 'blur(16px) opacity(.6)' : '',
                }}
            >
            </div>
            <div className="left-side">
                <div>
                    <div className="cover">
                        <div className="cover-container">
                            <img
                                src={currentSongList?.items ? currentSongList?.items[count]?.album?.images[0]?.url ? currentSongList?.items[count]?.album?.images[0]?.url : currentSongList.imgPic : ''}
                                alt=""
                                loading="lazy"
                            />
                            <div
                                className="shadow"
                                style={{ background: `url(${currentSongList?.items ? currentSongList?.items[count]?.album?.images[0]?.url ? currentSongList?.items[count]?.album?.images[0]?.url : currentSongList.imgPic : ''})` }}
                            >
                            </div>
                        </div>
                    </div>
                    <Player lyrics={true}></Player>
                </div>
            </div>
            <div className="right-side">
                <div
                    className="lyrics-container"
                    style={{ fontSize: setDemo?.songFontSize ? `${setDemo?.songFontSize}px` : '' }}
                >
                    <div id="line-1" className="line"></div>
                    <div id="line0" className={`line  ${currentLyricIndex === 0 ? 'highlight' : ''}`}>
                        <div className="content">
                            <span>
                                作曲 :
                                {currentSongList?.items?.[count]?.artists?.[0]?.name}
                            </span>
                            <br />
                        </div>
                    </div>
                    <div id="line1" className={`line  ${currentLyricIndex === 1 ? 'highlight' : ''}`}>
                        <div className="content">
                            <span>
                                作词 :
                                {currentSongList?.items?.[count]?.artists?.[0]?.name}
                            </span>
                            <br />
                        </div>
                    </div>
                    {lyricsByUrl
                        ? lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '')?.map((item: string, index: number) => {
                            return (
                                <div
                                    id={`line${index + 2}`}
                                    className={`line ${currentLyricIndex === index + 2 ? 'highlight' : ''}`}
                                >
                                    <div className="content">
                                        <span>
                                            {item}
                                        </span>
                                        <br />
                                    </div>
                                </div>
                            )
                        })
                        : (
                                <div id="line2" className="line">
                                    <div className="content">
                                        <span>
                                            该歌曲暂未提供歌词
                                        </span>
                                        <br />
                                    </div>
                                </div>
                            )}
                    <div
                        id={`line${lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '')?.length}`}
                        className={`line  ${currentLyricIndex === lyricsByUrl?.result?.lyrics?.split('\n')?.filter((item: string) => item !== '')?.length ? 'highlight' : ''}`}
                    >
                        <div className="content">
                            <span>
                                歌词来源: Happi.dev
                            </span>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="close-button"
                onClick={() => {
                    setShowLyrics(false)
                }}
            >
                <button style={{ margin: '0 0' }}>
                    <SvgIcon>
                        {lyricsSvg}
                    </SvgIcon>
                </button>
            </div>
        </div>
    )
}
