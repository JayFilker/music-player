import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCurrentMovieOne } from '../../api/movie'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Movie } from '../../components/Movie'
import { SvgIcon } from '../../components/SvgIcon'
import { ContextMenu } from '../../components/TopList/ContextMenu'
import './index.less'
import 'plyr/dist/plyr.css'

export default function MoviePage() {
    const [currentMovie, setCurrentMovie] = useState<any>()
    const [videoKey, setVideoKey] = useState()
    const list = ['复制链接', '在浏览器中打开']
    const [twoShow, setTowShow] = useState(false)
    const [searchParams] = useSearchParams()
    const [movieDemo, setMovie] = useState<Array<any>>([])
    const [moviesList, setMoviesList] = useState<any>([])
    const [btnShow, setBtnShow] = useState(true)
    const videoRef = useRef(null)
    const [movieDetail, setMovieDetail] = useState<{
        'x-qn-meta'?: { time: string, views: string }
        'mimeType': string
    }>({ 'x-qn-meta': { time: '', views: '' }, 'mimeType': '' })

    async function getMusic() {
        const response = await axios.get(`http://localhost:3000/api/videos`)
        setMovie(response.data.videos)
        response.data.videos.forEach((video: any) => {
            if (video.title === searchParams.get('title')) {
                setCurrentMovie({
                    ...video,
                    name: video.title.split('-')[1],
                    artist: video.title.split('-')[0],
                })
                setVideoKey(video.key)
            }
        })
        setMoviesList(response.data.videos.filter((item: any) => item.title !== searchParams.get('title')))
    }

    const getCurrentMovie = async () => {
        if (videoKey) {
            getCurrentMovieOne(videoKey).then((data: any) => {
                setMovieDetail(data)
            })
        }
    }
    useEffect(() => {
        getMusic().then()
    }, [])
    useEffect(() => {
        if (videoKey) {
            getCurrentMovie().then()
        }
    }, [currentMovie])
    const handleClickOutside = () => {
        if (twoShow) {
            setTowShow(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [twoShow])
    useEffect(() => {
        if (currentMovie && searchParams.get('title') !== currentMovie.title) {
            movieDemo.forEach((video: any) => {
                if (video.title === searchParams.get('title')) {
                    setCurrentMovie({
                        ...video,
                        name: video.title.split('-')[1],
                        artist: video.title.split('-')[0],
                    })
                    setVideoKey(video.key)
                }
            })
            setMoviesList(movieDemo.filter((item: any) => item.title !== searchParams.get('title')))
        }
    }, [searchParams.get('title')])
    return (
        currentMovie
            ? (
                    <div className="mv-page">
                        <div className="current-video">
                            <div className="video" style={{ position: 'relative' }}>
                                <video
                                    ref={videoRef}
                                    className="plyr"
                                    style={{ width: '100%' }}
                                    controls
                                    crossOrigin="anonymous"
                                    // 移除src属性，让Plyr完全控制
                                    src={currentMovie ? `http://${encodeURI(currentMovie.videoUrl)}` : ''}
                                    onPlay={() => {
                                        setBtnShow(false)
                                    }}
                                    onPause={() => {
                                        setBtnShow(true)
                                    }}
                                >

                                    您的浏览器不支持视频播放
                                </video>
                                <ButtonIcon
                                    sty={{
                                        display: btnShow ? '' : 'none',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: '#335eea',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onClick={() => {
                                        if (videoRef.current) {
                                            (videoRef.current as HTMLVideoElement).play()
                                        }
                                    }}
                                >
                                    <SvgIcon sty={{ width: '18px', height: '18px' }}>
                                        <svg id="plyr-play" viewBox="0 0 18 18">
                                            <path
                                                d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"
                                            >
                                            </path>
                                        </svg>
                                    </SvgIcon>
                                </ButtonIcon>
                            </div>
                            <div className="video-info">
                                <div className="title">
                                    {currentMovie.artist.split(',').map((item: any, index: number) => {
                                        if (index < currentMovie.artist.split(',').length - 1) {
                                            return (
                                                <Link to="/firstPage" key={index}>
                                                    {item}
                                                    ,
                                                </Link>
                                            )
                                        }
                                        else {
                                            return (
                                                <Link to="/firstPage" key={index}>
                                                    {item}
                                                </Link>
                                            )
                                        }
                                    })}
                                    -
                                    {currentMovie.name}

                                    <div className="buttons" style={{ position: 'relative' }}>
                                        <ButtonIcon classname="button">
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
                                        <ButtonIcon
                                            classname="button"
                                            onClick={(e: any) => {
                                                e.stopPropagation()
                                                setTowShow(true)
                                            }}
                                        >
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="img"
                                                    viewBox="0 0 512 512"
                                                    className="svg-inline--fa fa-ellipsis-h fa-w-16 fa-9x"
                                                    id="icon-more"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                                                        className=""
                                                    >
                                                    </path>
                                                </svg>
                                            </SvgIcon>
                                        </ButtonIcon>
                                        <ContextMenu
                                            style={{
                                                display: twoShow ? 'block' : 'none',
                                                top: '25px',
                                                left: '60px',
                                                position: 'absolute',
                                            }}
                                            setShow={setTowShow}
                                            list={list}
                                        >
                                        </ContextMenu>
                                    </div>
                                </div>
                                <div className="info">
                                    {movieDetail?.['x-qn-meta']?.views || '暂无'}
                                    Views ·
                                    {movieDetail?.['x-qn-meta']?.time || '暂无时间'}
                                </div>
                            </div>
                        </div>
                        <div className="more-video">
                            <div className="section-title">
                                更多视频
                            </div>
                            <Movie movie={moviesList} keyValue={searchParams.get('q') || ''}></Movie>
                        </div>
                    </div>
                )
            : <div style={{ paddingTop: '100px', fontSize: '30px', color: 'white' }}>页面未找到，请返回上一页</div>
    )
}
