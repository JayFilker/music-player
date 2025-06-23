import { useAtom } from 'jotai/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlaysList } from '../../../api/check.ts'
import { CountDemo, CurrentAlum, CurrentSongList, Device, IsPlayingDemo } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'

interface Props {
    playTrack: (trackUri: string) => Promise<string | void>
}

export function LeftBottom(props: Props) {
    const [count] = useAtom(CountDemo)
    const { playTrack } = props
    const [deviceId] = useAtom(Device)
    const navigate = useNavigate()
    const [, setIsPlaying] = useAtom(IsPlayingDemo)
    const [currentSong] = useAtom<{
        items: Array<{ name: string, artists: Array<any>, id: string, album?: { images: Array<{ url: string }> } }>
        imgPic: string
    }>(CurrentSongList)
    const pausePlayback = async () => {
        if (!deviceId)
            return
        try {
            setIsPlaying(false)
            const token = localStorage.getItem('spotify_access_token') as string
            await fetch(`https://api.spotify.com/v1/me/player/pause`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
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
            const token = localStorage.getItem('spotify_access_token') as string
            await fetch(`https://api.spotify.com/v1/me/player/play`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
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
    const [currentAlbum, setCurrentAlbum] = useAtom<any>(CurrentAlum)
    useEffect(() => {
        if (currentSong?.items && currentSong.items[count]?.id) {
            getPlaysList('tracks', currentSong?.items[count]?.id).then((res) => {
                setCurrentAlbum(res)
            })
        }
    }, [currentSong])
    return (
        <div className="playing">
            <div className="container">
                <img
                    loading="lazy"
                    alt=""
                    // src={currentSong?.items ? currentSong.imgPic : ''}
                    src={currentSong?.items ? currentSong?.items?.[count]?.album?.images[0]?.url ? currentSong?.items[count]?.album?.images[0]?.url : currentSong.imgPic : ''}
                    onClick={() => {
                        navigate(`/playsList?id=${currentAlbum?.album?.id}&type=albums`)
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
                    <ButtonIcon title="喜欢">
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="icon-heart">
                                <path
                                    d="M 9.5449219 3 C 5.3895807 3 2 6.3895806 2 10.544922 C 2 14.283156 4.9005496 18.084723 7.6601562 21.119141 C 10.419763 24.153558 13.171875 26.369141 13.171875 26.369141 A 1.0001 1.0001 0 0 0 13.197266 26.388672 C 13.517448 26.630481 13.956962 26.684854 14.369141 26.785156 A 1.0001 1.0001 0 0 0 15 27 A 1.0001 1.0001 0 0 0 15.630859 26.785156 C 16.043038 26.684854 16.482552 26.630481 16.802734 26.388672 A 1.0001 1.0001 0 0 0 16.828125 26.369141 C 16.828125 26.369141 19.580237 24.153558 22.339844 21.119141 C 25.099451 18.084722 28 14.283156 28 10.544922 C 28 6.3895806 24.610419 3 20.455078 3 C 17.450232 3 15.833405 4.5910542 15 5.5664062 C 14.166595 4.5910543 12.549768 3 9.5449219 3 z M 9.5449219 5 C 12.372924 5 14.069642 7.4290597 14.126953 7.5117188 A 1.0001 1.0001 0 0 0 14.910156 8.0078125 A 1.0001 1.0001 0 0 0 15.003906 8.0117188 A 1.0001 1.0001 0 0 0 15.019531 8.0117188 A 1.0001 1.0001 0 0 0 15.042969 8.0097656 A 1.0001 1.0001 0 0 0 15.119141 8.0039062 A 1.0001 1.0001 0 0 0 15.871094 7.5136719 C 15.925786 7.4347249 17.624838 5 20.455078 5 C 23.529737 5 26 7.4702629 26 10.544922 C 26 13.147688 23.499768 16.870104 20.859375 19.773438 C 18.227966 22.666891 15.607768 24.780451 15.589844 24.794922 C 15.414236 24.925626 15.219097 25 15 25 C 14.780903 25 14.585764 24.925626 14.410156 24.794922 C 14.392232 24.780451 11.772034 22.66689 9.140625 19.773438 C 6.5002316 16.870105 4 13.147688 4 10.544922 C 4 7.4702629 6.470263 5 9.5449219 5 z"
                                    fill="currentColor"
                                >
                                </path>
                            </svg>
                        </SvgIcon>
                    </ButtonIcon>
                </div>
            </div>
            <div className="blank"></div>
        </div>
    )
}
