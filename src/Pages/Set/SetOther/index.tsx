import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetOther() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <h3>
                {' '}
                {t('其他')}
            </h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('关闭主面板时...')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.closeTime}
                        onChange={(e) => {
                            const value = { ...setDemo, closeTime: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="ask">
                            {t('询问')}
                        </option>
                        <option value="exit">
                            {t('退出')}
                        </option>
                        <option value="minimizeToTray">
                            {t('最小化到托盘')}
                        </option>
                    </select>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('启动后显示音乐库')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="enable-custom-titlebar"
                            type="checkbox"
                            name="enable-custom-titlebar"
                            checked={localStorage.getItem('showMusicK') === 'true'}
                            onChange={() => {
                                const value = { ...setDemo, showMusicK: !setDemo.showMusicK }
                                setSetDemo(value)
                                const sure = localStorage.getItem('showMusicK') === 'true' ? 'false' : 'true'
                                localStorage.setItem('showMusicK', String(sure))
                            }}
                        />
                        <label htmlFor="enable-custom-titlebar"></label>
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('首页显示来自 Apple Music 的歌单')}

                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="show-library-default"
                            type="checkbox"
                            name="show-library-default"
                            checked={setDemo.showApple}
                            onChange={() => {
                                const value = { ...setDemo, showApple: !setDemo.showApple }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="show-library-default"></label>
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('副标题使用别名')}
                    </div
                    >
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="show-playlists-by-apple-music"
                            type="checkbox"
                            name="show-playlists-by-apple-music"
                            checked={setDemo.alias}
                            onChange={() => {
                                const value = { ...setDemo, alias: !setDemo.alias }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="show-playlists-by-apple-music"></label>
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('启用倒序播放功能 (实验性功能)')}

                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="sub-title-default"
                            type="checkbox"
                            name="sub-title-default"
                            checked={setDemo.flashback}
                            onChange={() => {
                                const value = { ...setDemo, flashback: !setDemo.flashback }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="sub-title-default"></label>
                    </div>
                </div>
            </div>

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
                            checked={setDemo.entertainment}
                            onChange={() => {
                                const value = { ...setDemo, entertainment: !setDemo.entertainment }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="nyancat-style"></label>
                    </div>
                </div>
            </div>
        </>
    )
}
