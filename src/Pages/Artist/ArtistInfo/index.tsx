import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SvgIcon } from '../../../components/SvgIcon'
import { ContextMenu } from '../../../components/TopList/ContextMenu'
import { CountDemo, CurrentSongList, Playing } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { artistSvgList } from '../artistSvgList.tsx'

export function ArtistInfo(props: any) {
    const { albumsArtist, hotSongs, album, setShowShade, setTowShow, twoShow } = props
    const { t } = useTranslation()
    const list = ['复制链接', '在浏览器中打开'] // todo 只用一次，可以内联到参数上
    const [, setPlay] = useAtom(Playing)
    const [, setCount] = useAtom(CountDemo)
    const [, setCurrentSong] = useAtom<{ items: Array<any>, imgPic: string }>(CurrentSongList)
    return (
        <div className="artist-info">
            <div className="head">
                <img src={albumsArtist?.images[0].url} loading="lazy" alt="" />
            </div>
            <div>
                <div className="name">
                    {albumsArtist?.name}
                </div>
                <div className="artist">
                    {t('艺人')}
                </div>
                <div className="statistics">
                    <a href="#popularTracks">
                        {`${hotSongs?.tracks.length} `}
                        {' '}
                        {t('首热门歌曲')}
                    </a>
                    {` · `}
                    <a href="#albums">
                        {`${album?.items?.length} `}
                        {t('张专辑')}
                    </a>
                </div>
                <div
                    className="description"
                    onClick={() => {
                        setShowShade(true)
                    }}
                >
                    暂无描述
                </div>
                <div className="buttons" style={{ position: 'relative' }}>
                    <button
                        className="blue"
                        style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}

                        onClick={() => {
                            setCurrentSong({
                                items: [hotSongs?.tracks[0]],
                                imgPic: hotSongs?.tracks[0]?.album.images[0]?.url,
                            })
                            setCount(0)
                            setPlay((prev) => {
                                const newPlay = prev.map(() => {
                                    return false
                                })
                                newPlay[0] = true
                                return newPlay
                            })
                            console.log(hotSongs?.tracks[0].url)
                            // @ts-ignore
                            eventBus.emit('play-track', hotSongs?.tracks[0].uri)
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '8px' }}>
                            {artistSvgList.play}
                        </SvgIcon>
                        {` ${t('播放')} `}
                    </button>
                    <button className="grey" style={{ borderRadius: '8px', padding: '8px 0px', width: 'auto' }}>
                        <SvgIcon sty={{ marginRight: '0px' }}>
                            {artistSvgList.like}
                        </SvgIcon>
                    </button>
                    <button
                        className="grey"
                        onClick={(e) => {
                            e.stopPropagation()
                            setTowShow(true)
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '0px' }}>
                            {artistSvgList.omit}
                        </SvgIcon>
                    </button>
                    <ContextMenu
                        style={{
                            display: twoShow ? 'block' : 'none',
                            top: '25px',
                            left: '195px',
                            position: 'absolute',
                        }}
                        setShow={setTowShow}
                        list={list}
                    >
                    </ContextMenu>
                </div>
            </div>
        </div>
    )
}
