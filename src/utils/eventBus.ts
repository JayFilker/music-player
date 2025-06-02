import mitt from 'mitt'

// 定义事件类型（可选但推荐）
export interface EventTypes {
    'play-song': { id?: number }
    'pause-song': void
    'next-song': void
    'prev-song': void
    'set-volume': { volume: number }
    'toggle-repeat': void
    'toggle-shuffle': void
    'playList-playing': { e: React.MouseEvent, id: string, img: string, count?: number }
    // 添加更多事件类型...
}

// 创建mitt实例并导出
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
const eventBus = mitt<EventTypes>()

export default eventBus
