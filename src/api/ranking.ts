import axios from 'axios'

export async function fetchProfileByName(name: string, token: any): Promise<any> {
    try {
        // 按名称/标签搜索
        const encodedKey = encodeURIComponent(`label:"${name}"`)
        const result = await axios.get(`https://api.spotify.com/v1/search?q=${encodedKey}&type=playlist&limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        // if (!result.ok) {
        //     throw new Error(`API请求失败: ${result.status}`)
        // }

        return await result.data
    }
    catch (error) {
        console.error(`搜索名称 ${name} 时出错:`, error)
        return { albums: { items: [] } }
    }
}

export async function fetchProfileByNation(nation: string, token: any): Promise<any> {
    try {
        const result = await axios.get(`https://api.spotify.com/v1/search?q=label:"${nation}"&type=playlist&limit=10&market=${nation}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        // if (!result.ok) {
        //     throw new Error(`API请求失败: ${result.status}`)
        // }

        return await result.data
    }
    catch (error) {
        console.error(`搜索国家 ${nation} 时出错:`, error)
        return { albums: { items: [] } }
    }
}
