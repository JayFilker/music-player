import { TrackItem } from '../TrackItem'
import './index.less'

interface Props {
    tracks?: any
}

export function Track(props: Props) {
    const { tracks } = props
    return (
        <div className="track-list">
            <div className="context-menu" style={{ display: 'none' }}>
                <div
                    className="menu"
                >
                    <div className="item-info">
                        {/* <img */}
                        {/* :src="rightClickedTrackComputed.al.picUrl | resizeImage(224)" */}
                        {/* loading="lazy" */}
                        {/* /> */}
                        <div className="info">
                            <div className="title">12</div>
                            <div className="subtitle">11</div>
                        </div>
                    </div>
                    <hr />
                    <div className="item">12</div>
                    <div className="item">22</div>
                    <div
                        className="item"
                    >
                        11
                    </div
                    >
                    <hr v-show="type !== 'cloudDisk'" />
                    <div
                        className="item"
                    >
                        12
                    </div>
                    <div
                        className="item"
                    >
                        31
                    </div>
                    <div
                        className="item"
                    >
                        从歌单中删除
                    </div
                    >
                    <div
                        className="item"
                    >
                        54
                    </div
                    >
                    <div className="item">54</div>
                    <div
                        className="item"
                    >
                        从云盘中删除
                    </div
                    >
                </div>
            </div>
            {/* </ContextMenu> */}

            <div style={{ display: 'grid', gap: '4px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {tracks?.items.map((track: any, index: number) => {
                    return <TrackItem track={track} key={index} index={index}></TrackItem>
                })}

                {/* <TrackListItem */}
                {/*    v-for="(track, index) in tracks" */}
                {/* :key="itemKey === 'id' ? track.id : `${track.id}${index}`" */}
                {/* :track-prdisplay: grid; gap: 4px; grid-template-columns: repeat(4, 1fr);op="track" */}
                {/* :track-no="index + 1" */}
                {/* :highlight-playing-track="highlightPlayingTrack" */}
                {/* @dblclick.native="playThisList(track.id || track.songId)" */}
                {/* @click.right.native="openMenu($event, track, index)" */}
                {/* /> */}
            </div>
        </div>
    )
}
