import axios from 'axios'

export async function getCurrentMovieOne(videoKey: any) {
    if (videoKey) {
        // const response = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/videos/info?key=${encodeURIComponent(videoKey)}`)
        const response = await axios.get(`http://localhost:3000/api/videos/info?key=${encodeURIComponent(videoKey)}`)
        return await response.data
    }
}

export async function getMusic() {
    // const response = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/videos`)
    const response = await axios.get(`http://localhost:3000/api/videos`)
    return response.data.videos
}

export async function getMovieImg() {
    const responseDemo = await axios.get(`http://localhost:3000/api/imgs`)
    // const responseDemo = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/imgs`)
    return responseDemo.data.videos
}
