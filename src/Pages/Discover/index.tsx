import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getAlbumList } from '../../api/album.ts'
import { ButtonIconTwo } from '../../components/ButtonIconTwo'
import { SearchList } from '../../components/SearchList'
import { SvgIcon } from '../../components/SvgIcon'
import { AlbumList } from '../../store/store.ts'
import './index.less'

export default function Discover() {
    const [showSmallKey, setShowSmallKey] = useState(false)
    const [searchKey, setSearchKey] = useState(['全部', '推荐歌单', '精品歌单', '官方', '排行榜', '欧美', '流行', '摇滚', '电子', '说唱', 'ACG'])
    const smallSearchKey = [{ mainType: '语种', content: ['华语', '欧美', '日语', '韩语', '粤语'] }, {
        mainType: '风格',
        content: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', 'New Age', '古风', '后摇', 'Bossa Nova'],
    }, {
        mainType: '场景',
        content: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧'],
    }, {
        mainType: '情感',
        content: ['怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念'],
    }, {
        mainType: '主题',
        content: ['综艺', '影视原声', 'ACG', '儿童', '校园', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', '钢琴', '器乐', '榜单', '00后'],
    }]
    const [albumList, setAlbumList] = useAtom<any>(AlbumList)

    async function fetchProfile(key: string, offset: number): Promise<any> {
        const token = localStorage.getItem('spotify_access_token')
        const json = await getAlbumList(token, key, offset)
        if (offset === 0) {
            setAlbumList(json)
        }
        else {
            const updatedList = {
                ...albumList, // 复制原始对象的所有属性
                albums: {
                    ...albumList.albums, // 复制albums对象的所有属性
                    items: [
                        ...albumList.albums.items, // 保留原有的items
                        ...json.albums.items, // 添加新的items
                    ],
                },
            }
            setAlbumList(updatedList)
        }
    }

    const [currentKey, setCurrentKey] = useState('\'\'')
    const [currentNumber, setCurrentNumber] = useState(0)
    useEffect(() => {
        fetchProfile(currentKey, currentNumber)
    }, [])

    // console.log(albumList)
    return (
        <div className="explore-page">
            <h1>发现</h1>
            <div className="buttons">
                {searchKey.map((key: string, index: number) => (
                    <div
                        className={`button ${key === '全部' ? 'active' : ''}`}
                        key={index}
                        onClick={(e) => {
                            setShowSmallKey(false)
                            if (e.currentTarget.classList.contains('active')) {
                                // 如果有，则移除active类名
                                e.currentTarget.classList.remove('active')
                            }
                            else {
                                // 如果没有，则添加active类名
                                document.querySelectorAll('.button.active').forEach((el) => {
                                    el.classList.remove('active')
                                })

                                e.currentTarget.classList.add('active')
                                const buttonContent = e.currentTarget.textContent as string
                                if (buttonContent !== '全部') {
                                    fetchProfile(buttonContent, 0)
                                    setCurrentNumber(0)
                                    setCurrentKey(buttonContent)
                                }
                                else {
                                    fetchProfile('\'\'', 0)
                                    setCurrentNumber(0)
                                    setCurrentKey('\'\'')
                                }
                            }
                        }}
                    >
                        {key}
                    </div>
                ))}

                <div className="button more" onClick={() => setShowSmallKey(!showSmallKey)}>
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
                </div>
            </div>

            <div className="panel" style={{ display: showSmallKey ? '' : 'none' }}>
                {smallSearchKey.map((key, index: number) => {
                    return (
                        <div className="big-cat" key={index}>
                            <div className="name">{key.mainType}</div>

                            <div className="cats">
                                {key.content.map((content, index) => {
                                    return (
                                        <div
                                            className={`cat ${searchKey.includes(content) ? 'active' : ''}`}
                                            key={index}
                                            onClick={(e) => {
                                                if (e.currentTarget.classList.contains('active')) {
                                                    e.currentTarget.classList.remove('active')
                                                    setSearchKey(searchKey.filter((key: string) => key !== content))
                                                }
                                                else {
                                                    setSearchKey([...searchKey, content])
                                                    e.currentTarget.classList.add('active')
                                                }
                                            }}
                                        >
                                            <span>{content}</span>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    )
                })}
            </div>

            <div className="playlists">
                <SearchList
                    songList={albumList?.albums?.items}
                >
                </SearchList>
            </div>
            <div className="load-more">
                <ButtonIconTwo
                    color="grey"
                    style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}
                    onClick={() => {
                        const newOffset = currentNumber + 50
                        fetchProfile(currentKey, newOffset)
                        setCurrentNumber(newOffset)
                    }}
                >
                    加载更多
                </ButtonIconTwo>
            </div>
        </div>
    )
}
