import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'
import { Extre } from './Extre'

export function SetUnblockNeteaseMusic() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <section className="unm-configuration">
            <h3>UnblockNeteaseMusic</h3>
            <div className="item">
                <div className="left">
                    <div
                        className="title"
                    >
                        {t('启用')}
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
                            checked={setDemo.useUnblock}
                            onChange={(e) => {
                                const value = { ...setDemo, useUnblock: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="enable-unblock-netease-music"></label>
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('备选音源')}
                    </div>
                    <div className="description">
                        {t('音源的具体代号')}
                        <a
                            href="https://github.com/UnblockNeteaseMusic/server-rust/blob/main/README.md#支援的所有引擎"
                            target="_blank"
                        >
                            {t('可以点此到 UNM 的说明页面查询。')}
                            {' '}
                        </a
                        >
                        <br />
                        {t('多个音源请用')}
                        {' '}
                        <code>,</code>
                        {' '}
                        {t('逗号分隔。')}
                        <br />
                        {t('留空则使用 UNM 内置的默认值。')}
                    </div>
                </div>
                <div className="right">
                    <input
                        className="text-input margin-right-0"
                        placeholder="例 bilibili, kuwo"
                        value={setDemo.alternativeAudioSource}
                        onChange={(e) => {
                            const value = { ...setDemo, alternativeAudioSource: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    />
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('启用 FLAC')}
                    </div>
                    <div className="description">
                        {t('启用后需要清除歌曲缓存才能生效')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="unm-enable-flac"
                            type="checkbox"
                            checked={setDemo.useFlac}
                            onChange={(e) => {
                                const value = { ...setDemo, useFlac: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="unm-enable-flac" />
                    </div>
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('音源搜索模式')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.searchModel}
                        onChange={(e) => {
                            const value = { ...setDemo, searchModel: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="fast-first">
                            {t('速度优先')}
                        </option>
                        <option value="order-first">
                            {t('顺序优先')}
                        </option>
                    </select>
                </div>
            </div>

            <Extre></Extre>
        </section>
    )
}
