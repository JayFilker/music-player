import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import qrCodeImg from '../../assets/img/下载.png'
import { SvgIcon } from '../../components/SvgIcon'
import { loginFocus, loginShow, loginSvgListList, loginValue } from './loginAdditionalList.tsx'
import './index.less'

export default function Login() {
    const [show, setShow] = useState(loginShow)
    const [value, setValue] = useState(loginValue)
    const [focus, setFocus] = useState(loginFocus)
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation()

    function handleInputChange(e: any, index: number) {
        const valueDemo = value.map(item => item)
        valueDemo[index].value = e.target.value
        setValue(valueDemo)
    }

    function handleOnBlur(index: number) {
        const focusDemo = focus.map(item => item)
        focusDemo[index].show = false
        focusDemo[index].name = value[index].placeholder as string
        setFocus(focusDemo)
    }

    function handleOnFocus(index: number) {
        const focusDemo = focus.map(item => item)
        focusDemo[index].show = true
        focusDemo[index].name = ''
        setFocus(focusDemo)
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="section-1">
                    <img src="http://localhost:27232/img/logos/netease-music.png" alt="" />
                </div>
                <div className="title">{t('登录网易云账号')}</div>
                <div className="section-2">
                    <div className="input-box" style={{ display: show[0].state ? 'none' : '' }}>
                        <div
                            className={`container ${focus[0].show ? 'active' : ''}`}
                        >
                            <SvgIcon>
                                {loginSvgListList.phone}
                            </SvgIcon>
                            <div className="inputs">
                                <input
                                    id="countryCode"
                                    value={value[3].value}
                                    onChange={(e) => {
                                        handleInputChange(e, 3)
                                    }}
                                    onBlur={() => {
                                        handleOnBlur(0)
                                    }}
                                    onFocus={() => {
                                        handleOnFocus(0)
                                    }}
                                />
                                <input
                                    id="phoneNumber"
                                    placeholder={t(focus[0].name)}
                                    onChange={(e) => {
                                        handleInputChange(e, 0)
                                    }}
                                    onBlur={() => {
                                        handleOnBlur(0)
                                    }}
                                    onFocus={() => {
                                        handleOnFocus(0)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-box" style={{ display: show[1].state ? 'none' : '' }}>
                        <div className={`container ${focus[1].show ? 'active' : ''}`}>
                            <SvgIcon>
                                {loginSvgListList.email}
                            </SvgIcon>
                            <div className="inputs">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder={t(focus[1].name)}
                                    onChange={(e) => {
                                        handleInputChange(e, 1)
                                    }}
                                    onBlur={() => {
                                        handleOnBlur(1)
                                    }}
                                    onFocus={() => {
                                        handleOnFocus(1)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-box" style={{ display: !show[1].state || !show[0].state ? '' : 'none' }}>
                        <div className={`container ${focus[2].show ? 'active' : ''}`}>
                            <SvgIcon>
                                {loginSvgListList.password}
                            </SvgIcon>
                            <div className="inputs">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder={t(focus[2].name)}
                                    onChange={(e) => {
                                        handleInputChange(e, 2)
                                    }}
                                    onBlur={() => {
                                        handleOnBlur(2)
                                    }}
                                    onFocus={() => {
                                        handleOnFocus(2)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: show[2].state ? 'none' : '' }}>
                        <div className="qr-code-container">
                            <img
                                style={{ width: '192px', height: '192px' }}
                                src={qrCodeImg}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                        <div className="qr-code-info">
                            打开网易云音乐APP扫码登录
                        </div>
                    </div>
                </div>
                <div className="confirm" style={{ display: !show[1].state || !show[0].state ? '' : 'none' }}>
                    <button
                        style={{ display: loading ? '' : 'none' }}
                        onClick={() => {
                            setLoading(false)
                        }}
                    >
                        {t('登录')}
                    </button>
                    <button className="loading" disabled style={{ display: loading ? 'none' : '' }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="other-login">
                    {show.map((item, index) => {
                        const firstTrueIndex = show.findIndex(item => item.state)
                        return (
                            <>
                                <a
                                    style={{ display: item.state ? '' : 'none' }}
                                    key={index}
                                    href="#"
                                    onClick={() => {
                                        const state = show.map((itemDemo, i) => {
                                            return index === i || !itemDemo.state
                                                ? {
                                                        name: itemDemo.name,
                                                        state: !itemDemo.state,
                                                    }
                                                : itemDemo
                                        })
                                        setShow(state)
                                    }}
                                >
                                    {t(item.name)}
                                </a>
                                <span style={{ display: index === firstTrueIndex ? '' : 'none' }}>|</span>
                            </>
                        )
                    })}
                </div>
                <div className="notice" style={{ display: 'none' }}>
                </div>
            </div>
        </div>
    )
}
