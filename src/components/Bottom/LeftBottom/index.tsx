import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlaysList } from '../../../api/check.ts'
import { useFavoriteSongs, useUpdateFavoriteSongs } from '../../../api/favoriteSongs.ts'
import { usePausePlaybackPut, useResumePlaybackPut } from '../../../api/system.ts'
import { CountDemo, CurrentSongList, Device, IsPlayingDemo } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { leftSvgList } from './leftSvgList.tsx'

interface Props {
    playTrack: (trackUri: string) => Promise<string | void>
}

export function LeftBottom(props: Props) {
    const [count] = useAtom(CountDemo)
    const { playTrack } = props
    const [deviceId] = useAtom(Device)
    const navigate = useNavigate()
    const [, setIsPlaying] = useAtom(IsPlayingDemo)
    const { mutate: pausePlaybackPut } = usePausePlaybackPut()
    const { mutate: resumePlaybackPut } = useResumePlaybackPut()
    const [currentSong] = useAtom<{
        items: Array<{ name: string, artists: Array<any>, id: string, album?: { images: Array<{ url: string }> } }>
        imgPic: string
    }>(CurrentSongList)
    const { data } = usePlaysList('tracks', currentSong?.items?.[count]?.id)
    const [currentSL] = useAtom(CurrentSongList)
    const [change, setChange] = useState(true)
    const { data: favoriteSongs, refetch } = useFavoriteSongs(change)
    const { mutate: updateFavoriteSongs } = useUpdateFavoriteSongs()
    const pausePlayback = async () => {
        if (!deviceId)
            return
        try {
            setIsPlaying(false)
            pausePlaybackPut()
            console.log('已暂停播放')
        }
        catch (e) {
            console.log(`暂停失败，原因为：${e}`)
        }
    }
    const resumePlayback = async () => {
        if (!deviceId)
            return
        try {
            setIsPlaying(true)
            resumePlaybackPut()
            console.log('继续播放')
        }
        catch (e) {
            console.log(`播放失败，原因为：${e}`)
        }
    }
    useEffect(() => {
        const handlePlaySong = (trackUri?: string) => {
            if (trackUri) {
                playTrack(trackUri)
            }
            else {
                resumePlayback()
            }
        }
        const handleStop = () => {
            pausePlayback()
        }
        // @ts-ignore
        eventBus.on('play-track', handlePlaySong)
        // @ts-ignore
        eventBus.on('play-stop', handleStop)
        return () => {
            // @ts-ignore
            eventBus.off('play-track', handlePlaySong)
            // @ts-ignore
            eventBus.off('play-stop', handleStop)
        }
    }, [deviceId])

    return (
        <div className="playing">
            <div className="container">
                <img
                    loading="lazy"
                    alt=""
                    src={currentSong?.items ? currentSong?.items?.[count]?.album?.images[0]?.url ? currentSong?.items[count]?.album?.images[0]?.url : currentSong.imgPic : ''}
                    onClick={() => {
                        navigate(`/playsList?id=${data?.album?.id}&type=albums`)
                    }}
                />
                <div className="track-info">
                    <div className="name">
                        {currentSong?.items ? currentSong.items[count]?.name : ''}
                    </div>
                    <div className="artist">
                        {
                            currentSong?.items
                                ? currentSong.items[count]?.artists.map((item: {
                                        name: string
                                        id: string
                                    }, index: number) => {
                                        return (
                                            <span key={index}>
                                                <span
                                                    className="ar"
                                                    onClick={() => {
                                                        navigate(`/artist?id=${item.id}`)
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                                {index !== currentSong.items[count]?.artists.length - 1 && <span>, </span>}
                                            </span>
                                        )
                                    })
                                : ''
                        }
                    </div>
                </div>
                <div className="like-button">
                    <ButtonIcon
                        title="喜欢"
                        onClick={async () => {
                            const check = favoriteSongs?.songs?.some((item: any) => item.name === currentSL?.items?.[count].name)
                            const currentSong = currentSL?.items?.[count]
                            if (currentSong) {
                                try {
                                    updateFavoriteSongs({ check, currentSong })
                                    setChange(!change)
                                    await refetch()
                                }
                                catch (e) {
                                    // eslint-disable-next-line no-alert
                                    alert('收藏失败')
                                }
                            }
                        }}
                    >
                        <SvgIcon
                            sty={{
                                display: favoriteSongs?.songs?.some(
                                    (item: any) => item.name === currentSL?.items?.[count].name,
                                )
                                    ? 'none'
                                    : '',
                            }}
                        >
                            {leftSvgList.like}
                        </SvgIcon>
                        <SvgIcon
                            sty={{
                                display: favoriteSongs?.songs?.some(
                                    (item: any) => item.name === currentSL?.items?.[count].name,
                                )
                                    ? ''
                                    : 'none',
                            }}
                        >
                            {leftSvgList.noLike}
                        </SvgIcon>
                    </ButtonIcon>
                </div>
            </div>
            <div className="blank"></div>
        </div>
    )
}
