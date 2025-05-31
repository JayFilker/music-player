declare global {
    interface Window {
        Spotify: {
            Player: new (options: SpotifyPlayerOptions) => SpotifyPlayer
        }
        onSpotifyWebPlaybackSDKReady: () => void
    }
}

export interface SpotifyPlayerOptions {
    name: string
    getOAuthToken: (callback: (token: string) => void) => void
    volume: number
}

export interface SpotifyDeviceEvent {
    device_id: string
}

export interface SpotifyPlayer {
    connect: () => Promise<boolean>
    disconnect: () => void
    addListener: (
        eventName: string,
        callback: (e: { device_id: string }) => void
    ) => void
    removeListener: (
        eventName: string,
        callback?: (event: any) => void
    ) => void
}

// 这一行确保文件被视为模块
export {}
