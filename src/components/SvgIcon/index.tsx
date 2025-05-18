import React from 'react'
import './index.less'

export function SvgIcon({ children, sty }: { children: React.ReactNode, sty?: object }) {
    return (
        <svg className="svg-icon" aria-hidden="true" style={sty}>
            {children}
        </svg>
    )
}
