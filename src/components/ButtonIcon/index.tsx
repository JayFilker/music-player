import React from 'react'
import './index.less'

export function ButtonIcon({ children, sty, classname, title, onClick }: { children: React.ReactNode, sty?: object, classname?: string, title?: string, onClick?: () => void }) {
    return (
        <button className={`button-icon ${classname}`} style={sty} title={title} onClick={onClick}>
            {children}
        </button>
    )
}
