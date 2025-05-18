import { useState } from 'react'
import 'vscode-codicons/dist/codicon.css'
import './index.less'
// import { ipcRenderer } from 'electron';
const ipcRenderer = window.require?.('electron')?.ipcRenderer
export function TopSpace() {
    const [small, setSmall] = useState(false)
    function windowMinimize() {
        try {
            ipcRenderer.send('minimize')
        }
        catch {
            // eslint-disable-next-line no-alert
            alert('此功能为Electron专属，浏览器环境不可用，请直接用浏览器自带的')
        }
    }

    function windowMaxRestore() {
        try {
            ipcRenderer.send('maximizeOrUnmaximize')
        }
        catch {
            // eslint-disable-next-line no-alert
            alert('此功能为Electron专属，浏览器环境不可用，请直接用浏览器自带的')
        }
    }

    function windowClose() {
        try {
            ipcRenderer.send('close')
        }
        catch {
            // eslint-disable-next-line no-alert
            alert('此功能为Electron专属，浏览器环境不可用，请直接用浏览器自带的')
        }
    }
    return (
        <div className="win32-titlebar">
            <div className="title"> MyYesPlayMusic </div>
            <div className="controls" style={{ padding: '0 0' }}>
                <div
                    className="button minimize codicon codicon-chrome-minimize"
                    onClick={windowMinimize}
                >
                </div>
                <div
                    className={`button max-restore codicon ${small ? 'codicon-chrome-restore' : 'codicon-chrome-maximize'}`}

                    onClick={() => {
                        setSmall(!small)
                        windowMaxRestore()
                    }}
                >
                </div>
                <div
                    className="button close codicon codicon-chrome-close"
                    onClick={windowClose}
                >
                </div>
            </div>
        </div>
    )
}
