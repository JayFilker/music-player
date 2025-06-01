const mockResponses = {
    'https://api.spotify.com/666': {
        artists: {
            items: [
                {
                    id: '1A2B3C',
                    name: 'Mock Artist 1',
                    popularity: 85,
                    followers: { total: 350000 },
                    images: [{ url: 'https://via.placeholder.com/300' }],
                    genres: ['pop'],
                },
                {
                    id: '4D5E6F',
                    name: 'Mock Artist 2',
                    popularity: 76,
                    followers: { total: 250000 },
                    images: [{ url: 'https://via.placeholder.com/300' }],
                    genres: ['rock'],
                },
                // 可以添加更多mock艺术家...
            ],
            total: 100,
            limit: 6,
            offset: 0,
        },
    },
    // 可以添加更多API路径的模拟响应...
}

// 替换全局fetch方法
const originalFetch = window.fetch

window.fetch = async (url, options) => {
    // console.log(`[Mock] 拦截请求: ${url}`)

    // 检查URL是否匹配任何mock响应
    // 使用startsWith来匹配URL前缀
    const mockUrl = Object.keys(mockResponses).find(key => url.startsWith(key))

    if (mockUrl) {
        // console.log('[Mock] 返回模拟数据')

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 300))

        // 返回模拟响应
        return {
            ok: true,
            status: 200,
            json: async () => mockResponses[mockUrl],
        }
    }

    // 如果没有匹配的模拟数据，则使用原始fetch
    // console.log('[Mock] 没有匹配的模拟数据，使用原始fetch')
    return originalFetch(url, options)
}

// console.log('[Mock] Fetch拦截器已安装')
