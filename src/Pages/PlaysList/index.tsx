import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getPlaysList, internalInit } from '../../api/check.ts'
import { ArtistAlbum } from '../../components/ArtistAlbum'
import { Shade } from '../../components/shade'
import { TrackList } from '../../components/TrackList'
import { PlayListInfo } from './PlayListInfo'
import './index.less'

export default function PlaysList() {
    const [searchParams] = useSearchParams()
    const [songList, setSongList] = useState<any>()
    const [twoShow, setTowShow] = useState(false)
    const [showShade, setShowShade] = useState(false)
    const [demo, setDemo] = useState<any>()
    useEffect(() => {
        const type = searchParams.get('type')
        const id = searchParams.get('id')
        getPlaysList(type, id)
            .then((data) => {
                setSongList(data)
            })
    }, [searchParams.get('id')])
    const [songListInfo, setSongListInfo] = useState<any>()

    async function inIt(id: string) {
        const tokenOne = localStorage.getItem('spotify_access_token')
        internalInit(id, searchParams.get('type') === 'playlists', tokenOne as string).then((data: any) => {
            let time = 0
            setSongListInfo(data)
            setDemo(data)
            if (searchParams.get('type') === 'albums') {
                data.items.forEach((track: any) => {
                    time += track.duration_ms
                })
                setSongList({ ...songList, time: Math.floor(time / 60000) })
            }
        })
    }

    useEffect(() => {
        if (songList && !songList.time) {
            inIt(songList.id)
        }
    }, [songList])

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

    return (
        <div className={`playlist ${searchParams.get('type') !== 'playlists' ? 'album-page' : ''}`}>
            <PlayListInfo
                demo={demo}
                songList={songList}
                songListInfo={songListInfo}
                setSongListInfo={setSongListInfo}
                searchParams={searchParams}
                setShowShade={setShowShade}
                setTowShow={setTowShow}
                twoShow={twoShow}
            >
            </PlayListInfo>

            {searchParams.get('type') === 'playlists'
                ? (
                        <TrackList
                            songListInfo={songListInfo}
                            songList={songList}
                        >
                        </TrackList>
                    )
                : <TrackList songListInfo={songListInfo} songList={songList}></TrackList>}
            <div className="extra-info" style={{ display: searchParams.get('type') === 'playlists' ? 'none' : '' }}>
                <div className="album-time"></div>
                <div className="release-date" style={{ color: '#fff' }}>
                    发行于
                    {songList?.release_date?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                </div>
            </div>
            {searchParams.get('type') === 'playlists'
                ? ' '
                : (
                        <div className="more-by">
                            <div className="section-title">
                                {'More by '}
                                <Link to={`/artist?id=${songList?.artists ? songList?.artists[0]?.id : ''}`}>
                                    {songList?.artists ? songList?.artists[0]?.name : ''}
                                </Link>
                            </div>
                            <div>
                                <ArtistAlbum artist={songList?.artists ? songList?.artists[0]?.name : ''}></ArtistAlbum>
                            </div>
                        </div>
                    )}
            <Shade
                style={{ display: showShade ? '' : 'none' }}
                name={songList?.name}
                description={songList?.description ? songList?.description : '暂无描述'}
                setShowShade={setShowShade}
            >
            </Shade>
        </div>
    )
}
