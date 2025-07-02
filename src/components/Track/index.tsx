import { useState } from 'react'
import { TrackItem } from '../TrackItem'
import './index.less'

interface Props {
    tracks?: any
    songFirstDemo?: boolean
    setSongFirstDemo?: (value: boolean) => void
}

export function Track(props: Props) {
    const { tracks, songFirstDemo, setSongFirstDemo } = props
    const [songFirst, setSongFirst] = useState(true)
    return (
        <div className="track-list">
            <div className="context-menu" style={{ display: 'none' }}>
                <div className="menu">
                    <div className="item-info">
                        <div className="info">
                            <div className="title">12</div>
                            <div className="subtitle">11</div>
                        </div>
                    </div>
                    <hr />
                    <div className="item">12</div>
                    <div className="item">22</div>
                    <div className="item">11</div>
                    <hr />
                    <div className="item">12</div>
                    <div className="item">31</div>
                    <div className="item">从歌单中删除</div>
                    <div className="item">54</div>
                    <div className="item">54</div>
                    <div className="item">
                        从云盘中删除
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gap: '4px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {tracks?.items?.map((track: any, index: number) => {
                    return (
                        <TrackItem
                            tracks={tracks?.items}
                            track={track}
                            key={index}
                            index={index}
                            songFirst={songFirstDemo ?? songFirst}
                            setSongFirst={setSongFirstDemo ?? setSongFirst}
                        >
                        </TrackItem>
                    )
                })}
            </div>
        </div>
    )
}
