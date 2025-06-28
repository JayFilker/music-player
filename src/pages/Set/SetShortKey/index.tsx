import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { Active, SetDemo } from '../../../store/store.ts'
import { defaultKey } from './defaultKey.ts'

export function SetShortKey() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    const [active, setActive] = useAtom(Active)
    const showActive = (e: any, index: number, check: boolean) => {
        e.stopPropagation()
        if (check) {
            const demo = active.map((i: any) => {
                return {
                    ...i,
                    active: false,
                    allActive: false,
                }
            })
            demo[index].active = true
            setActive(demo)
        }
        else {
            if (setDemo.shortcutKey) {
                const demo = active.map((i: any) => {
                    return {
                        ...i,
                        active: false,
                        allActive: false,
                    }
                })
                demo[index].allActive = true
                setActive(demo)
            }
        }
    }
    return (
        <div>
            <h3>
                {' '}
                {t('快捷键')}
            </h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {' '}
                        {t('启用全局快捷键')}
                    </div>
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="enable-enable-global-shortcut"
                            type="checkbox"
                            name="enable-enable-global-shortcut"
                            checked={setDemo.shortcutKey}
                            onChange={() => {
                                const value = { ...setDemo, shortcutKey: !setDemo.shortcutKey }
                                setSetDemo(value)
                                if (!setDemo.shortcutKey) {
                                    // eslint-disable-next-line no-alert
                                    alert('由于当前处于浏览器状态，而全局快捷键为Electron专属功能，因此启用全局快捷键也无法生效，当然，普通快捷键正常生效')
                                }
                            }}
                        />
                        <label htmlFor="enable-enable-global-shortcut"></label>
                    </div>
                </div>
            </div>
            <div
                id="shortcut-table"
                className={setDemo.shortcutKey ? '' : 'global-disabled'}
            >
                <div className="row row-head">
                    <div className="col">
                        {' '}
                        {t('功能')}
                    </div>
                    <div className="col">
                        {' '}
                        {t('快捷键')}
                    </div>
                    <div className="col">
                        {' '}
                        {t('全局快捷键')}
                    </div>
                </div>
                {active.map((item: any, index: number) => {
                    return (
                        <div
                            className="row"
                        >
                            <div className="col">
                                {' '}
                                {t(item.function)}
                            </div>
                            <div className="col">
                                <div
                                    tabIndex={0}
                                    className={`keyboard-input ${active[index].active ? 'active' : ''}`}
                                    onClick={(e) => {
                                        showActive(e, index, true)
                                    }}
                                    onKeyDown={(e) => {
                                        if (active[index].active) {
                                            const key = e.key
                                            const modifiers = {
                                                ctrl: e.ctrlKey,
                                                alt: e.altKey,
                                                shift: e.shiftKey,
                                            }
                                            if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift' && e.key !== 'Tab' && e.key !== 'CapsLock' && e.key !== 'Meta') {
                                                const demo = active.map((item: any) => item)
                                                demo[index].shortKey = `${modifiers.ctrl ? `Control + ` : ''}${modifiers.alt ? `Alt + ` : ''}${modifiers.shift ? `Shift + ` : ''}${key}`
                                                setActive(demo)
                                            }
                                        }
                                    }}
                                >
                                    {item.shortKey}
                                </div>
                            </div>
                            <div className="col">
                                <div
                                    tabIndex={0}
                                    className={`keyboard-input ${active[index].allActive ? 'active' : ''}`}
                                    onClick={(e) => {
                                        showActive(e, index, false)
                                    }}
                                    onKeyDown={(e) => {
                                        if (active[index].allActive) {
                                            const key = e.key
                                            const modifiers = {
                                                ctrl: e.ctrlKey,
                                                alt: e.altKey,
                                                shift: e.shiftKey,
                                            }
                                            if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift' && e.key !== 'Tab' && e.key !== 'CapsLock' && e.key !== 'Meta') {
                                                const demo = active.map((item: any) => item)
                                                demo[index].allShortKey = `${modifiers.ctrl ? `Control + ` : ''}${modifiers.alt ? `Alt + ` : ''}${modifiers.shift ? `Shift + ` : ''}${key}`
                                                setActive(demo)
                                            }
                                        }
                                    }}
                                >
                                    {item.allShortKey}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <button
                    className="restore-default-shortcut"
                    onClick={() => {
                        setActive(defaultKey)
                    }}
                >
                    {t('恢复默认快捷键')}
                </button
                >
            </div>
        </div>
    )
}
