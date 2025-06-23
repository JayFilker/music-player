import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SvgIcon } from '../../SvgIcon'
import { svgList } from './svg.tsx'
import './index.less'

export function ContextMenu({ style, setShow, list, setShowSearch, showSearch, inputfocus }: {
    style?: React.CSSProperties
    setShow: (show: boolean) => void
    list?: string[]
    setShowSearch?: (show: boolean) => void
    showSearch?: boolean
    inputfocus?: () => void
}) {
    const navigate = useNavigate()
    const { t } = useTranslation()
    return (
        <div className="context-menu" style={{ width: '100px' }}>
            <div
                className="menu"
                style={style}
            >
                {
                    list
                        ? list.map((item: string, index: number) => {
                                return (
                                    <div
                                        className="item"
                                        key={index}

                                        onClick={() => {
                                            if (setShowSearch && inputfocus && index === 1) {
                                                inputfocus()
                                                setShowSearch(!showSearch)
                                            }
                                        }}
                                    >
                                        {t(item)}
                                    </div>
                                )
                            })
                        : svgList.map((item, i) => (
                                <div
                                    className="item"
                                    key={i}
                                    onClick={() => {
                                        if (i === 1) {
                                            navigate('/login')
                                        }
                                        else if (i === 0) {
                                            navigate('/set')
                                        }
                                        setShow(false)
                                    }}
                                >
                                    <SvgIcon>
                                        {item.svg}
                                    </SvgIcon>
                                    {t(item.name)}
                                </div>
                            ))
                }
            </div>
        </div>
    )
}
