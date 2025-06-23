import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetQualityAndEquipment() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('音质选择')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.soundQuality}
                        onChange={(e) => {
                            const value = { ...setDemo, soundQuality: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="128000">
                            {t('普通')}
                            {' '}
                            - 128Kbps
                        </option>
                        <option value="192000">
                            {t('较高')}
                            {' '}
                            - 192Kbps
                        </option>
                        <option value="320000">
                            {t('极高')}
                            {' '}
                            - 320Kbps
                        </option>
                        <option value="flac">
                            {t('无损')}
                            {' '}
                            - FLAC
                        </option>
                        <option value="999000">Hi-Res</option>
                    </select>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('音频输出设备')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.equipment}
                        onChange={(e) => {
                            const value = { ...setDemo, equipment: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
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
        </>
    )
}
