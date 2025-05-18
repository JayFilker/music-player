declare global {
    interface Window {
        require: (module: 'electron') => {
            ipcRenderer: {
                send: (channel: string, ...args: any[]) => void;
                on: (channel: string, func: (...args: any[]) => void) => void;
                removeListener: (channel: string, func: (...args: any[]) => void) => void;
            };
        };
    }
}
export {};
