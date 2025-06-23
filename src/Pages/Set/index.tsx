import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/Language'
import './index.less'
// import { useState } from 'react'

export default function Set() {
    // const [language, setLaguage] = useState<string>()
    const { t } = useTranslation()
    return (
        <div className="settings-page">
            <div className="container">
                <div className="user" style={{ display: 'none' }}>
                    <div className="left">
                        {/* <img className="avatar" :src="data.user.avatarUrl" loading="lazy" /> */}
                        <div className="info">
                            <div className="nickname">666</div>
                            <div className="extra-info">
                                <span
                                    className="vip"
                                >
                                    <span className="text">黑胶VIP</span>
                                </span>
                                <span className="text">1111</span>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        {/* <button> */}
                        {/* <svg-icon icon-class="logout" /> */}
                        {/* {{ $t('settings.logout') }} */}
                        {/* </button> */}
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">{t('语言')}</div>
                    </div>
                    <div className="right">
                        <LanguageSwitcher></LanguageSwitcher>
                        {/* <select */}
                        {/*    onSelect={(e) => { */}
                        {/*        setLaguage(e.currentTarget.value) */}
                        {/*    }} */}
                        {/* > */}
                        {/*    <option value="en">🇬🇧 English</option> */}
                        {/*    <option value="tr">🇹🇷 Türkçe</option> */}
                        {/*    <option value="zh-CN">🇨🇳 简体中文</option> */}
                        {/*    <option value="zh-TW">繁體中文</option> */}
                        {/* </select> */}
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">{t('外观')}</div>
                    </div>
                    <div className="right">
                        <select>
                            <option value="auto">{t('自动')}</option>
                            <option value="light">
                                🌞
                                {t('浅色')}
                            </option>
                            <option value="dark">
                                🌚
                                {t('深色')}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">
                            {t('音乐语种偏好')}
                        </div>
                    </div>
                    <div className="right">
                        <select v-model="musicLanguage">
                            <option value="all">
                                {t('无偏好')}
                            </option>
                            <option value="zh">{t('华语')}</option>
                            <option value="ea">{t('欧美')}</option>
                            <option value="jp">{t('日语')}</option>
                            <option value="kr">{t('韩语')}</option>
                        </select>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title"> 音质选择</div>
                    </div>
                    <div className="right">
                        <select v-model="musicQuality">
                            <option value="128000">
                                普通 - 128Kbps
                            </option>
                            <option value="192000">
                                较高 - 192Kbps
                            </option>
                            <option value="320000">
                                极高 - 320Kbps
                            </option>
                            <option value="flac">
                                无损 - FLAC
                            </option>
                            <option value="999000">Hi-Res</option>
                        </select>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title"> 音频输出设备</div>
                    </div>
                    <div className="right">
                        <select>
                            <option value="default"> Default - 扬声器 (Realtek(R) Audio)</option>
                            <option value="communications">
                                {' '}
                                Communications - 扬声器 (Realtek(R)
                                Audio)
                            </option>
                            <option
                                value="60acb7f06c644e1200b5f52a0576dc8e79d750eec1cd11073071851ad65fa62a"
                            >
                                {' '}
                                扬声器 (Realtek(R) Audio)
                            </option>
                        </select>
                    </div>
                </div>

                <h3>缓存</h3>
                <div className="item">
                    <div className="left">
                        <div className="title">
                            自动缓存歌曲
                        </div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="automatically-cache-songs"
                                type="checkbox"
                                name="automatically-cache-songs"
                            />
                            <label htmlFor="automatically-cache-songs"></label>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">歌曲缓存上限</div>
                    </div>
                    <div className="right">
                        <select v-model="cacheLimit">
                            <option>
                                无限制
                            </option>
                            <option value="512"> 500MB</option>
                            <option value="1024"> 1GB</option>
                            <option value="2048"> 2GB</option>
                            <option value="4096"> 4GB</option>
                            <option value="8192"> 8GB</option>
                        </select>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">
                            已缓存 0 首(0字节)
                        </div>
                    </div>
                    <div className="right">
                        <button>
                            清除歌曲缓存
                        </button>
                    </div>
                </div>

                <h3>歌词</h3>
                <div className="item">
                    <div className="left">
                        <div className="title">显示歌词翻译</div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="show-lyrics-translation"
                                type="checkbox"
                                name="show-lyrics-translation"
                            />
                            <label htmlFor="show-lyrics-translation"></label>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">显示歌词背景</div>
                    </div>
                    <div className="right">
                        <select v-model="lyricsBackground">
                            <option value="false">
                                关闭
                            </option>
                            <option value="true">
                                打开
                            </option>
                            <option value="blur"> 模糊封面</option>
                            <option value="dynamic">
                                动态
                            </option>
                        </select>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">显示当前时间</div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="show-lyrics-time"
                                type="checkbox"
                                name="show-lyrics-time"
                            />
                            <label htmlFor="show-lyrics-time"></label>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title"> 歌词字体大小</div>
                    </div>
                    <div className="right">
                        <select>
                            <option value="16">
                                小 - 16px
                            </option>
                            <option value="22">
                                中 - 22px
                            </option>
                            <option value="28">
                                大（默认） - 28px
                            </option>
                            <option value="36">
                                超大 - 36px
                            </option>
                        </select>
                    </div>
                </div>
                {/* <div className="item"> */}
                {/*    <div className="left"> */}
                {/*        <div className="title"> */}
                {/*            8888 */}
                {/*            <a */}
                {/*                target="_blank" */}
                {/*                href="https://github.com/osdlyrics/osdlyrics" */}
                {/*            > */}
                {/*                OSDLyrics */}
                {/*            </a */}
                {/*            > */}
                {/*            1111111 */}
                {/*        </div> */}
                {/*        <div className="description"> */}
                {/*            jjjjj */}
                {/*            <br /> */}
                {/*            kkkkkk */}
                {/*        </div> */}
                {/*    </div> */}
                {/*    <div className="right"> */}
                {/*        <div className="toggle"> */}
                {/*            /!* <input *!/ */}
                {/*            /!*    id="enable-osdlyrics-support" *!/ */}
                {/*            /!*    v-model="enableOsdlyricsSupport" *!/ */}
                {/*            /!*    type="checkbox" *!/ */}
                {/*            /!*    name="enable-osdlyrics-support" *!/ */}
                {/*            /!* /> *!/ */}
                {/*            /!* <label for="enable-osdlyrics-support"></label> *!/ */}
                {/*        </div> */}
                {/*    </div> */}
                {/* </div> */}

                <section className="unm-configuration">
                    <h3>UnblockNeteaseMusic</h3>
                    <div className="item">
                        <div className="left">
                            <div
                                className="title"
                            >
                                启用
                                <a
                                    href="https://github.com/UnblockNeteaseMusic/server"
                                    target="blank"
                                >
                                    UnblockNeteaseMusic
                                </a
                                >
                            </div
                            >
                        </div>
                        <div className="right">
                            <div className="toggle">
                                <input
                                    id="enable-unblock-netease-music"
                                    type="checkbox"
                                    name="enable-unblock-netease-music"
                                />
                                <label htmlFor="enable-unblock-netease-music"></label>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">
                                备用音源
                            </div>
                            <div className="description">
                                音源的具体代号
                                <a
                                    href="https://github.com/UnblockNeteaseMusic/server-rust/blob/main/README.md#支援的所有引擎"
                                    target="_blank"
                                >
                                    可以点此到 UNM 的说明页面查询。
                                    {' '}
                                </a
                                >
                                <br />
                                多个音源请用
                                {' '}
                                <code>,</code>
                                {' '}
                                逗号分隔。
                                <br />
                                留空则使用 UNM 内置的默认值。
                            </div>
                        </div>
                        <div className="right">
                            <input
                                className="text-input margin-right-0"
                                placeholder="例 bilibili, kuwo"
                            />
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">启用FLAC</div>
                            <div className="description">
                                启用后需要清除歌曲缓存才能生效
                            </div>
                        </div>
                        <div className="right">
                            <div className="toggle">
                                <input
                                    id="unm-enable-flac"
                                    type="checkbox"
                                />
                                <label htmlFor="unm-enable-flac" />
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">音源搜索模式</div>
                        </div>
                        <div className="right">
                            <select>
                                <option value="fast-first">
                                    速度优先
                                </option>
                                <option value="order-first">
                                    顺序优先
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">Joox 引擎的 Cookie</div>
                            <div className="description">
                                <a
                                    href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#joox-cookie-設定說明"
                                    target="_blank"
                                >
                                    设置说明请参见此处 ，

                                </a>
                                留空则不进行相关设置
                            </div>
                        </div>
                        <div className="right">
                            <input
                                className="text-input margin-right-0"
                                placeholder="wmid=..; session_key=.."
                            />
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title"> QQ 引擎的 Cookie</div>
                            <div className="description">
                                <a
                                    href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#qq-cookie-設定說明"
                                    target="_blank"
                                >
                                    设置说明请参见此处 ，
                                </a>
                                留空则不进行相关设置
                            </div>
                        </div>
                        <div className="right">
                            <input
                                className="text-input margin-right-0"
                                placeholder="uin=..; qm_keyst=..;"
                            />
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">YtDl 引擎要使用的 youtube-dl 可执行文件</div>
                            <div className="description">
                                <a
                                    href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#ytdlexe-設定說明"
                                    target="_blank"
                                >
                                    设置说明请参见此处 ，
                                </a>
                                留空则不进行相关设置
                            </div>
                        </div>
                        <div className="right">
                            <input
                                className="text-input margin-right-0"
                                placeholder="ex. youtube-dl"
                            />
                        </div>
                    </div>

                    <div className="item">
                        <div className="left">
                            <div className="title">用于 UNM 的代理服务器</div>
                            <div className="description">
                                请求如 YouTube 音源服务时要使用的代理服务器
                                <br />
                                留空则不进行相关设置
                            </div>
                        </div>
                        <div className="right">
                            <input
                                className="text-input margin-right-0"
                                placeholder="ex. https://192.168.11.45"
                            />
                        </div>
                    </div>
                </section>

                <h3>自定义</h3>
                <div className="item">
                    <div className="left">
                        <div className="title">
                            连接 Last.fm
                        </div
                        >
                    </div>
                    <div className="right">
                        {/* <button> */}
                        {/*    断开连接 */}
                        {/* </button> */}
                        <button> 授权连接</button>
                    </div>
                </div>
                <div className="item">
                    <div className="left">
                        <div className="title">
                            启用 Discord Rich Presence
                        </div
                        >
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="enable-discord-rich-presence"
                                type="checkbox"
                                name="enable-discord-rich-presence"
                            />
                            <label htmlFor="enable-discord-rich-presence"></label>
                        </div>
                    </div>
                </div>

                <h3>其他</h3>
                <div className="item">
                    <div className="left">
                        <div className="title"> 关闭主面板时...</div>
                    </div>
                    <div className="right">
                        <select>
                            <option value="ask">
                                询问
                            </option>
                            <option value="exit">
                                退出
                            </option>
                            <option value="minimizeToTray">
                                最小化到托盘
                            </option>
                        </select>
                    </div>
                </div>

                <div className="item">
                    <div className="left">
                        <div className="title">启动后显示音乐库</div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="enable-custom-titlebar"
                                type="checkbox"
                                name="enable-custom-titlebar"
                            />
                            <label htmlFor="enable-custom-titlebar"></label>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="left">
                        <div className="title">
                            首页显示来自 Apple Music 的歌单

                        </div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="show-library-default"
                                type="checkbox"
                                name="show-library-default"
                            />
                            <label htmlFor="show-library-default"></label>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="left">
                        <div className="title">
                            副标题使用别名
                        </div
                        >
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="show-playlists-by-apple-music"
                                type="checkbox"
                                name="show-playlists-by-apple-music"
                            />
                            <label htmlFor="show-playlists-by-apple-music"></label>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="left">
                        <div className="title">
                            启用倒序播放功能 (实验性功能)

                        </div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="sub-title-default"
                                type="checkbox"
                                name="sub-title-default"
                            />
                            <label htmlFor="sub-title-default"></label>
                        </div>
                    </div>
                </div>

                {/* <div className="item"> */}
                {/*    <div className="left"> */}
                {/*        <div className="title">1</div> */}
                {/*    </div> */}
                {/*    <div className="right"> */}
                {/*        <div className="toggle"> */}
                {/*            <input */}
                {/*                id="enable-reversed-mode" */}
                {/*                type="checkbox" */}
                {/*                name="enable-reversed-mode" */}
                {/*            /> */}
                {/*            <label htmlFor="enable-reversed-mode"></label> */}
                {/*        </div> */}
                {/*    </div> */}
                {/* </div> */}

                <div className="item">
                    <div className="left">
                        <div className="title" style={{ transform: 'scaleX(-1)' }}>🐈️ 🏳️‍🌈</div>
                    </div>
                    <div className="right">
                        <div className="toggle">
                            <input
                                id="nyancat-style"
                                type="checkbox"
                                name="nyancat-style"
                            />
                            <label htmlFor="nyancat-style"></label>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>代理</h3>
                    <div className="item">
                        <div className="left">
                            <div className="title"> 代理协议</div>
                        </div>
                        <div className="right">
                            <select>
                                <option value="noProxy"> 关闭代理</option>
                                <option value="HTTP"> HTTP 代理</option>
                                <option value="HTTPS"> HTTPS 代理</option>
                            </select>
                        </div>
                    </div>
                    <div id="proxy-form">
                        <input
                            className="text-input"
                            placeholder="服务器地址"
                        />
                        <input
                            className="text-input"
                            placeholder="端口"
                            type="number"
                            min="1"
                            max="65535"
                        />
                        <button>更新代理</button>
                    </div>
                </div>
                {/* <div> */}
                {/*    <h3>Real IP</h3> */}
                {/*    <div className="item"> */}
                {/*        <div className="left"> */}
                {/*            <div className="title"> Real IP</div> */}
                {/*        </div> */}
                {/*        <div className="right"> */}
                {/*            <div className="toggle"> */}
                {/*                <input */}
                {/*                    id="enable-real-ip" */}
                {/*                    v-model="enableRealIP" */}
                {/*                    type="checkbox" */}
                {/*                    name="enable-real-ip" */}
                {/*                /> */}
                {/*                <label htmlFor="enable-real-ip"></label> */}
                {/*            </div> */}
                {/*        </div> */}
                {/*    </div> */}
                {/*    <div id="real-ip"> */}
                {/*        <input */}
                {/*            className="text-input" */}
                {/*            placeholder="IP地址" */}
                {/*        /> */}
                {/*    </div> */}
                {/* </div> */}

                <div>
                    <h3>快捷键</h3>
                    <div className="item">
                        <div className="left">
                            <div className="title">启用全局快捷键</div>
                        </div>
                        <div className="right">
                            <div className="toggle">
                                <input
                                    id="enable-enable-global-shortcut"
                                    type="checkbox"
                                    name="enable-enable-global-shortcut"
                                />
                                <label htmlFor="enable-enable-global-shortcut"></label>
                            </div>
                        </div>
                    </div>
                    <div
                        id="shortcut-table"
                    >
                        <div className="row row-head">
                            <div className="col">功能</div>
                            <div className="col">快捷键</div>
                            <div className="col">全局快捷键</div>
                        </div>
                        <div
                            className="row"
                        >
                            <div className="col">播放/暂停</div>
                            <div className="col">
                                <div
                                    className="keyboard-input"
                                >
                                    Control + →
                                </div>
                            </div>
                            <div className="col">
                                <div
                                    className="keyboard-input"
                                >
                                    Control+Alt+P
                                </div
                                >
                            </div>
                        </div>
                        <button
                            className="restore-default-shortcut"
                        >
                            恢复默认快捷键
                        </button
                        >
                    </div>
                </div>

                <div className="footer">
                    <p
                        className="author"
                    >
                        MADE BY
                        <a href="http://github.com/qier222" target="_blank">QIER222</a>
                    </p
                    >
                    <p className="version">v0.5</p>

                    {/* <a */}
                    {/*    v-if="!isElectron" */}
                    {/*    href="https://vercel.com/?utm_source=ohmusic&utm_campaign=oss" */}
                    {/* > */}
                    {/*    <img */}
                    {/*        height="36" */}
                    {/*        src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" */}
                    {/*        alt="" */}
                    {/*    /> */}
                    {/* </a> */}
                </div>
            </div>
        </div>
    )
}
