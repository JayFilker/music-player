import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetLikeMusic() {
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    const { t } = useTranslation()
    return (
        <div className="item">
            <div className="left">
                <div className="title">
                    {t('音乐语种偏好')}
                </div>
            </div>
            <div className="right">
                <select
                    value={setDemo.linkMusic}
                    onChange={(e) => {
                        const value = { ...setDemo, linkMusic: e.currentTarget.value }
                        setSetDemo(value)
                    }}
                >
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
    )
}
