import { useSearchParams } from 'react-router-dom'
import { SvgIcon } from '../SvgIcon'
import './index.less'

export function Shade(props: {
    description: string
    name?: string
    style: React.CSSProperties
    setShowShade: (show: boolean) => void
    artist?: boolean
}) {
    const { description, name, style, setShowShade, artist } = props
    const [searchParams] = useSearchParams()
    return (
        <div className="shade" style={style}>
            <div

                className="modal"
            >
                <div className="header">
                    <div className="title">
                        {' '}
                        {searchParams.get('type') === 'playlists' ? name : (artist ? '艺术家介绍' : '专辑介绍')}
                    </div>
                    <button
                        className="close"
                        onClick={() => {
                            setShowShade(false)
                        }}
                    >

                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="svg-inline--fa fa-times fa-w-11"
                                role="img"
                                viewBox="0 0 352 512"
                                id="icon-x"
                            >
                                <path
                                    fill="currentColor"
                                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                >
                                </path>
                            </svg>
                        </SvgIcon>
                    </button>
                </div>
                <div className="content">
                    <slot>{description}</slot>
                </div>
            </div>
        </div>
    )
}
