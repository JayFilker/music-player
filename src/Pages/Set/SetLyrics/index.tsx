import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetLyrics() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <h3>
                {' '}
                {t('歌词')}
            </h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('显示歌词翻译')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="show-lyrics-translation"
                            type="checkbox"
                            name="show-lyrics-translation"
                            checked={setDemo.showTranslate}
                            onChange={(e) => {
                                const value = { ...setDemo, showTranslate: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="show-lyrics-translation"></label>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('显示歌词背景')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.showBackGround}
                        onChange={(e) => {
                            const value = { ...setDemo, showBackGround: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="false">
                            {t('关闭')}
                        </option>
                        <option value="true">
                            {t('打开')}
                        </option>
                        <option value="blur">
                            {' '}
                            {t('模糊封面')}
                            {' '}
                        </option>
                        <option value="dynamic">
                            {t('动态')}
                        </option>
                    </select>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('显示当前时间')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="show-lyrics-time"
                            type="checkbox"
                            name="show-lyrics-time"
                            checked={setDemo.currentTime}
                            onChange={(e) => {
                                const value = { ...setDemo, currentTime: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="show-lyrics-time"></label>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('歌词字体大小')}
                        {' '}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.songFontSize}
                        onChange={(e) => {
                            const value = { ...setDemo, songFontSize: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="16">
                            {t('小')}
                            {' '}
                            - 16px
                        </option>
                        <option value="22">
                            {t('中')}
                            {' '}
                            - 22px
                        </option>
                        <option value="28">
                            {t('大（默认）')}
                            {' '}
                            - 28px
                        </option>
                        <option value="36">
                            {t('超大')}
                            {' '}
                            - 36px
                        </option>
                    </select>
                </div>
            </div>
        </>
    )
}
