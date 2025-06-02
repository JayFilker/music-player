import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { PlayingTrack } from '../../store/store.ts'
import { TrackListItem } from './TrackListItem'
import './index.less'

export function TrackList(props: {
    songListInfo: any
    tracks?: any[]
    itemKey?: string
    highlightPlayingTrack?: boolean
    extraContextMenuItem?: string[]
    songList?: any
}) {
    const { songListInfo, songList } = props
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    useEffect(() => {
        setPlayingTrack(Array.from({ length: songList?.items?.length }).fill(false))
    }, [])
    // console.log(songListInfo)
    return (
        <div className="track-list">
            {/*        <ContextMenu ref="menu"> */}
            {/*            <div v-show="type !== 'cloudDisk'" class="item-info"> */}
            {/*                <img */}
            {/*                :src="rightClickedTrackComputed.al.picUrl | resizeImage(224)" */}
            {/*                loading="lazy" */}
            {/*                /> */}
            {/*                <div class="info"> */}
            {/*                    <div class="title">{{ rightClickedTrackComputed.name }}</div> */}
            {/*                    <div class="subtitle">{{ rightClickedTrackComputed.ar[0].name }}</div> */}
            {/*                </div> */}
            {/*            </div> */}
            {/*            <hr v-show="type !== 'cloudDisk'" /> */}
            {/*            <div class="item" @click="play">{{ $t('contextMenu.play') }}</div> */}
            {/*    <div class="item" @click="addToQueue">{{ */}
            {/*        $t('contextMenu.addToQueue') */}
            {/*    }}</div> */}
            {/*    <div */}
            {/*        v-if="extraContextMenuItem.includes('removeTrackFromQueue')" */}
            {/*        class="item" */}
            {/*        @click="removeTrackFromQueue" */}
            {/*        >从队列删除</div */}
            {/*        > */}
            {/*        <hr v-show="type !== 'cloudDisk'" /> */}
            {/*        <div */}
            {/*    v-show="!isRightClickedTrackLiked && type !== 'cloudDisk'" */}
            {/*    class="item" */}
            {/* @click="like" */}
            {/*        > */}
            {/*        {{ $t('contextMenu.saveToMyLikedSongs') }} */}
            {/* </div> */}
            {/*    <div */}
            {/*        v-show="isRightClickedTrackLiked && type !== 'cloudDisk'" */}
            {/*        class="item" */}
            {/*        @click="like" */}
            {/*        > */}
            {/*        {{ $t('contextMenu.removeFromMyLikedSongs') }} */}
            {/* </div> */}
            {/*    <div */}
            {/*        v-if="extraContextMenuItem.includes('removeTrackFromPlaylist')" */}
            {/*        class="item" */}
            {/*        @click="removeTrackFromPlaylist" */}
            {/*        >从歌单中删除</div */}
            {/*        > */}
            {/*        <div */}
            {/*    v-show="type !== 'cloudDisk'" */}
            {/*    class="item" */}
            {/* @click="addTrackToPlaylist" */}
            {/*        >{{ $t('contextMenu.addToPlaylist') }}</div */}
            {/* > */}
            {/*    <div v-show="type !== 'cloudDisk'" class="item" @click="copyLink">{{ */}
            {/*        $t('contextMenu.copyUrl') */}
            {/*    }}</div> */}
            {/*    <div */}
            {/*        v-if="extraContextMenuItem.includes('removeTrackFromCloudDisk')" */}
            {/*        class="item" */}
            {/*        @click="removeTrackFromCloudDisk" */}
            {/*        >从云盘中删除</div */}
            {/*        > */}
            {/*        </ContextMenu> */}

            <div>
                {songListInfo && songListInfo.items?.map((track: any, index: number) => {
                    return (
                        <TrackListItem
                            key={index}
                            songList={songList}
                            content={track}
                            playingTrack={playingTrack}
                            index={index}
                            setPlayingTrack={setPlayingTrack}
                        >
                        </TrackListItem>
                    )
                })}

                {/*        <TrackListItem */}
                {/*    v-for="(track, index) in tracks" */}
                {/*        :key="itemKey === 'id' ? track.id : `${track.id}${index}`" */}
                {/* :track-prop="track" */}
                {/* :track-no="index + 1" */}
                {/* :highlight-playing-track="highlightPlayingTrack" */}
                {/* @dblclick.native="playThisList(track.id || track.songId)" */}
                {/* @click.right.native="openMenu($event, track, index)" */}
                {/*        /> */}
            </div>
        </div>
    )
}
