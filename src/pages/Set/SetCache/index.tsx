import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetCache() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <h3>缓存</h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('自动缓存歌曲')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="automatically-cache-songs"
                            type="checkbox"
                            name="automatically-cache-songs"
                            checked={setDemo.cache}
                            onChange={(e) => {
                                const value = { ...setDemo, cache: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="automatically-cache-songs"></label>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">{t('歌曲缓存上限')}</div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.limit}
                        onChange={(e) => {
                            const value = { ...setDemo, limit: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option>
                            {t('无限制')}
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
                        {t('已缓存 0 首(0字节)')}
                    </div>
                </div>
                <div className="right">
                    <button>
                        {t('清除歌曲缓存')}
                    </button>
                </div>
            </div>
        </>
    )
}
