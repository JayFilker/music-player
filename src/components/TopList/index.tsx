import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonIcon } from '../ButtonIcon'
import { SvgIcon } from '../SvgIcon'
import { TopSpace } from '../TopSpace'
import { ContextMenu } from './ContextMenu'
import { topSvgList } from './topSvgList.tsx'
import './index.less'
import 'vscode-codicons/dist/codicon.css'

export function TopList() {
    const [act, setAct] = useState(false)
    const [check, setCheck] = useState([true, false, false])
    const [show, setShow] = useState(false)
    const [keywords, setKeywords] = useState('')
    const pageList = [
        {
            name: '首页',
            link: '/firstpage',
        },
        {
            name: '发现',
            link: '/discover',
        },
        {
            name: '音乐库',
            link: '/login',
        },
    ]
    // 根据当前路径更新选中状态
    const { t } = useTranslation()
    const navigate = useNavigate()
    useEffect(() => {
        const currentPath = location.pathname
        const newCheckState = pageList.map(page => page.link === currentPath)

        // 如果没有匹配的路径，默认选中第一个
        if (!newCheckState.includes(true)) {
            newCheckState[0] = true
        }

        setCheck(newCheckState)
    }, [location.pathname]) // 当路径变化时重新执行

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (show && !e.target.closest('.context-menu') && !e.target.closest('.avatar')) {
                setShow(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [show])
    return (
        <div>
            <nav className="has-custom-titlebar">
                <TopSpace />
                <div className="navigation-buttons">
                    <ButtonIcon
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        <SvgIcon>
                            {topSvgList.left}
                        </SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon
                        onClick={() => {
                            navigate(1)
                        }}
                    >
                        <SvgIcon>
                            {topSvgList.right}
                        </SvgIcon>
                    </ButtonIcon>
                </div>
                <div className="navigation-links">
                    {
                        pageList.map((page, index: number) => (
                            <Link
                                key={index}
                                to={page.link}
                                style={{
                                    color: check[index] ? '#335eea' : '',
                                }}
                                onClick={() => {
                                    setCheck(check.map((_item, _index) => _index === index))
                                }}
                            >
                                {t(page.name)}
                            </Link>
                        ))
                    }
                </div>
                <div className="right-part">
                    <div className="search-box">
                        <div className={`container ${act ? 'active' : ''}`}>
                            <SvgIcon>
                                {topSvgList.search}
                            </SvgIcon>
                            <div
                                className="input"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <input
                                    v-model="keywords"
                                    type="search"
                                    value={keywords}
                                    placeholder={act ? '' : t('搜索')}
                                    onFocus={() => setAct(true)}
                                    onBlur={() => setAct(false)}
                                    style={{ marginTop: '-4px' }}
                                    onChange={e => setKeywords(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            // 执行提交操作
                                            navigate(`/search?q=${encodeURIComponent(keywords) || '*'}`)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <img
                        src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60"
                        className="avatar"
                        loading="lazy"
                        alt=""
                        tabIndex={0} // 使元素可聚焦
                        onClick={() => {
                            setShow(true)
                        }}
                    />
                </div>
            </nav>
            <ContextMenu style={{ display: show ? 'block' : 'none', right: '25px', top: '52px' }} setShow={setShow}>
            </ContextMenu>
        </div>
    )
}
