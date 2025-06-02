import React from 'react'

import './index.less'

export function ButtonIconTwo({ children, color, style, onClick }: { children: React.ReactNode, color: string, style?: any, onClick?: () => any }) {
    return (
        <button className={`${color} button-two`} style={style} onClick={onClick}>
            {children}
        </button>
    )
}
