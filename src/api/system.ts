import { put } from './http.ts'

export function seekToPositionPut(positionMs: any, deviceId: any) {
    return put(`/me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`)
}

export function playTrackPut(trackUri: string, deviceId: any) {
    return put(`/me/player/play?device_id=${deviceId}`, {
        uris: [trackUri],
    })
}

export function pausePlaybackPut() {
    return put(`https://api.spotify.com/v1/me/player/pause`)
}

export function resumePlaybackPut() {
    return put(`https://api.spotify.com/v1/me/player/play`)
}
