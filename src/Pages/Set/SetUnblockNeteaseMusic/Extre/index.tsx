import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../../store/store.ts'

export function Extre() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('Joox 引擎的 Cookie')}
                    </div>
                    <div className="description">
                        <a
                            href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#joox-cookie-設定說明"
                            target="_blank"
                        >
                            {t('设置说明请参见此处')}
                            {' '}
                            ，

                        </a>
                        {t('留空则不进行相关设置')}
                    </div>
                </div>
                <div className="right">
                    <input
                        className="text-input margin-right-0"
                        placeholder="wmid=..; session_key=.."
                        value={setDemo.rightOne}
                        onChange={(e) => {
                            const value = { ...setDemo, rightOne: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    />
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('QQ 引擎的 Cookie')}
                    </div>
                    <div className="description">
                        <a
                            href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#qq-cookie-設定說明"
                            target="_blank"
                        >
                            {t('设置说明请参见此处')}
                            {' '}
                            ，
                        </a>
                        {t('留空则不进行相关设置')}
                    </div>
                </div>
                <div className="right">
                    <input
                        className="text-input margin-right-0"
                        placeholder="uin=..; qm_keyst=..;"
                        value={setDemo.rightTwo}
                        onChange={(e) => {
                            const value = { ...setDemo, rightTwo: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    />
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('YtDl 引擎要使用的 youtube-dl 可执行文件')}
                    </div>
                    <div className="description">
                        <a
                            href="https://github.com/UnblockNeteaseMusic/server-rust/tree/main/engines#ytdlexe-設定說明"
                            target="_blank"
                        >
                            {t('设置说明请参见此处')}
                            {' '}
                            ，
                        </a>
                        {t('留空则不进行相关设置')}
                    </div>
                </div>
                <div className="right">
                    <input
                        className="text-input margin-right-0"
                        placeholder="ex. youtube-dl"
                        value={setDemo.rightThree}
                        onChange={(e) => {
                            const value = { ...setDemo, rightThree: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    />
                </div>
            </div>

            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('用于 UNM 的代理服务器')}
                    </div>
                    <div className="description">
                        {t('请求如 YouTube 音源服务时要使用的代理服务器')}
                        <br />
                        {t('留空则不进行相关设置')}
                    </div>
                </div>
                <div className="right">
                    <input
                        className="text-input margin-right-0"
                        placeholder="ex. https://192.168.11.45"
                        value={setDemo.rightFour}
                        onChange={(e) => {
                            const value = { ...setDemo, rightFour: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    />
                </div>
            </div>
        </>
    )
}
