import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetActing() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <div>
            <h3>
                {' '}
                {t('代理')}
            </h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('代理协议')}
                    </div>
                </div>
                <div className="right">
                    <select
                        value={setDemo.proxy}
                        onChange={(e) => {
                            const value = { ...setDemo, proxy: e.currentTarget.value }
                            setSetDemo(value)
                        }}
                    >
                        <option value="noProxy">
                            {' '}
                            {t('关闭代理')}
                        </option>
                        <option value="HTTP">
                            {' '}
                            {t('HTTP 代理')}
                        </option>
                        <option value="HTTPS">
                            {' '}
                            {t('HTTPS 代理')}
                        </option>
                    </select>
                </div>
            </div>
            <div id="proxy-form">
                <input
                    className="text-input"
                    placeholder="服务器地址"
                    disabled={setDemo.proxy === 'noProxy'}
                    value={setDemo.address}
                    onChange={(e) => {
                        const value = { ...setDemo, address: e.currentTarget.value }
                        setSetDemo(value)
                    }}
                />
                <input
                    className="text-input"
                    placeholder="端口"
                    type="number"
                    min="1"
                    max="65535"
                    disabled={setDemo.proxy === 'noProxy'}
                    value={setDemo.port}
                    onChange={(e) => {
                        const value = { ...setDemo, port: e.currentTarget.value }
                        setSetDemo(value)
                    }}
                />
                <button>
                    {' '}
                    {t('更新代理')}
                </button>
            </div>
        </div>
    )
}
