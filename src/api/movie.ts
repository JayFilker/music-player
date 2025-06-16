import axios from 'axios'

export async function getCurrentMovieOne(videoKey: any) {
    if (videoKey) {
        const response = await axios.get(`http://localhost:3000/api/videos/info?key=${encodeURIComponent(videoKey)}`)
        return await response.data
    }
}
