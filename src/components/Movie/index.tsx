import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMovieImg } from '../../api/movie.ts'
import './index.less'

interface Props {
    movie: Array<any>
    keyValue?: string
    limitNumber?: number
}

export function Movie(props: Props) {
    const { movie, keyValue, limitNumber } = props
    const navigate = useNavigate()
    const [show, setShow] = useState<Array<any>>([false, false, false, false, false])
    const [movieList, setMovieList] = useState<Array<{ title: string, artist: string, name: string, img?: string }>>([])
    const [currentMovie, setCurrentMovie] = useState<any>([])
    useEffect(() => {
        const currentMovieDemo = limitNumber !== 0 ? (movie?.filter((item: any) => item.title.includes(keyValue))?.filter((_itemDemoTwo: any, index: number) => index < 5) || []) : (movie?.filter((item: any) => item.title.includes(keyValue)) || [])

        setCurrentMovie(currentMovieDemo)
        setMovieList(
            currentMovieDemo.map((item: any) => {
                return { title: item.title.split('-')[1], artist: item.title.split('-')[0], name: item.title }
            }),
        )
    }, [movie, keyValue])
    const [img, setImg] = useState<Array<any>>([])
    useEffect(() => {
        getMovieImg().then((res) => {
            setImg(res)
        })
    }, [currentMovie])
    useEffect(() => {
        // 如果任一数据为空，直接返回
        if (!img?.length || !currentMovie?.length || !movieList?.length) {
            return
        }
        // 创建需要更新的项的映射
        let needUpdate = false
        const updatedMovieList = movieList.map((mv) => {
            // 查找匹配的图片
            const matchedImg = img.find(item => item.title === mv.name)

            // 如果找到匹配且当前项的img不是videoUrl (避免重复更新)
            if (matchedImg && !mv.img) {
                needUpdate = true
                return {
                    ...mv,
                    img: matchedImg.videoUrl,
                }
            }
            return mv
        })

        // 只有在有更新时才设置新状态
        if (needUpdate) {
            setMovieList(updatedMovieList)
        }

        // 添加所有依赖项
    }, [img, movieList, currentMovie])
    return (
        <div className="mv-row">
            {currentMovie?.map((mv: any, index: number) => (
                <div
                    className="mv"
                    key={index}

                >
                    <div
                        className="cover"
                    >
                        <img
                            src={movieList ? `http://${movieList[index].img}` : ''}
                            loading="lazy"
                            alt={mv.title}
                            style={{ aspectRatio: 'auto' }}
                            onMouseEnter={() => setShow(show.map((item, i) => i === index ? true : item))}
                            onMouseLeave={() => setShow(show.map((item, i) => i === index ? false : item))}
                            onClick={() => {
                                navigate(`/moviePage?q=${keyValue || ''}&title=${mv.title}`)
                            }}
                        />
                        <div
                            className="shadow"
                            style={{
                                backgroundImage: (show[index] && movieList) ? `url('http://${movieList[index].img}')` : 'none',
                            }}
                        >
                        </div>
                    </div>
                    <div className="info">
                        <div className="title">
                            <Link
                                to={`/moviePage?q=${keyValue || ''}&title=${mv.title}`}
                            >
                                {movieList ? movieList[index].title : ''}
                            </Link>
                        </div>
                        <div className="artist">
                            <Link
                                to={`/moviePage?q=${keyValue || ''}&title=${mv.title}`}
                            >
                                {movieList ? movieList[index].artist : ''}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
