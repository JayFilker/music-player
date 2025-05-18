import mitt from 'mitt';

// 定义事件类型（可选但推荐）
export type EventTypes = {
    'play-song': { id?: number };
    'pause-song': void;
    'next-song': void;
    'prev-song': void;
    'set-volume': { volume: number };
    'toggle-repeat': void;
    'toggle-shuffle': void;
    // 添加更多事件类型...
}

// 创建mitt实例并导出
const eventBus = mitt<EventTypes>();

export default eventBus;
