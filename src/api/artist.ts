import axios from 'axios'

export async function getArtistDetails(id: any, token: any) {
    const albumsResponse = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )
    return albumsResponse.data
}

export async function getArtistSongs(id: any, token: any) {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )

    return await response.data
}

export async function getNewAlbums(id: any, token: any) {
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&country=US`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )

    return await response.json()
}

export async function getArtistAlbums(id: any, token: any) {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )

    return await response.data
}

export async function getArtistAlbum(artistId: any, token: any, limit?: number) {
    const albumsResponse = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums?limit=${limit || 1}&include_groups=album,single`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )
    return await albumsResponse.data
}

export async function searchArtist(artistName: string, token: string) {
    // const id = encodeURIComponent(artistName.split(' ')[0])
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=10`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    )

    return await response.json()
}
