import axios from 'axios'

export async function getLyrics(artist: string, title: string) {
    try {
        // 注意：这个 API 是免费的但可能不稳定
        const response = await axios.get(
            `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
        )
        return response.data.lyrics
    }
    catch (error) {
        console.error('获取歌词失败:', error)
        return '歌词不可用'
    }
}
