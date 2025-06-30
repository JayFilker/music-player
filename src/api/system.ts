import { useMutation } from '@tanstack/react-query'
import { put } from './http.ts'

export function seekToPositionPut(positionMs: any, deviceId: any) {
    return put(`/me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`)
}

export function useSeekToPosition() {
    return useMutation({
        mutationFn: ({ positionMs, deviceId }: { positionMs: number, deviceId: string }) =>
            seekToPositionPut(positionMs, deviceId),
    })
}

export function playTrackPut(trackUri: string, deviceId: any) {
    return put(`/me/player/play?device_id=${deviceId}`, {
        uris: [trackUri],
    })
}

export function usePlayTrackPut() {
    return useMutation({
        mutationFn: ({ trackUri, deviceId }: { trackUri: string, deviceId: any }) =>
            playTrackPut(trackUri, deviceId),
    })
}

export function pausePlaybackPut() {
    return put(`https://api.spotify.com/v1/me/player/pause`)
}

export function usePausePlaybackPut() {
    return useMutation({
        mutationFn: () =>
            pausePlaybackPut(),
    })
}

export function resumePlaybackPut() {
    return put(`https://api.spotify.com/v1/me/player/play`)
}

export function useResumePlaybackPut() {
    return useMutation({
        mutationFn: () =>
            resumePlaybackPut(),
    })
}
