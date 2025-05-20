import { Link } from 'react-router-dom'
import { SongListImg } from '../SongListImg'
import './index.less'

interface Props {
    songList: Array<{
        id: string
        number?: number
        title: string
        imgPic: string
        des: string
    }>
}

export function SongList(props: Props) {
    const { songList } = props

    return (
        <div
            className="cover-row"
            style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {
                songList?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="item"
                        >
                            <SongListImg
                                img={item.imgPic}
                                number={item.number}
                                index={index}
                                id={item.id}
                            >
                            </SongListImg>
                            <div className="text">
                                <div
                                    className="title"
                                    style={{ fontSize: '16px', margin: '0 0' }}
                                >
                                    <Link to="/" style={{ color: 'white' }}>{item.title}</Link>
                                </div>
                                <div className="info">
                                    <span>{item.des ? item.des : ''}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
