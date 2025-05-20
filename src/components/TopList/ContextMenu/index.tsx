import { SvgIcon } from '../../SvgIcon'
import { svgList } from './svg.tsx'
import './index.less'

export function ContextMenu({ style }: { style?: React.CSSProperties }) {
    return (
        <div className="context-menu" style={style}>
            <div
                className="menu"
                style={{ right: '25px', top: '52px' }}
            >
                {
                    svgList.map((item, i) => (
                        <div className="item" key={i}>
                            <SvgIcon>
                                {item.svg}
                            </SvgIcon>
                            {item.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
