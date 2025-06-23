import './index.less'

export function Lyrics() {
    return (
        <div className="lyrics-page" style={{ display: 'none' }}>
            <div className="lyrics-background">
                <div className="top-right" />
                <div className="bottom-left" />
            </div>
            <div className="gradient-background"></div>
            <div className="left-side">
                <div>
                    <div className="date">
                    </div>
                    <div className="cover">
                        <div className="cover-container">
                            <div className="shadow"></div>
                        </div>
                    </div>
                    <div className="controls">
                        <div className="top-part">
                            <div className="track-info">
                                <div className="title">
                                    <span></span>
                                </div>
                                <div className="subtitle">
                                    <span></span>
                                    <span v-if="album.id !== 0">-</span>
                                </div>
                            </div>
                            <div className="top-right">
                                <div className="volume-control">
                                    <div className="volume-bar">
                                    </div>
                                </div>
                                <div className="buttons">
                                </div>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <span></span>
                            <div className="slider">
                            </div>
                            <span></span>
                        </div>
                        <div className="media-controls">
                            <div className="middle">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side">
            </div>
            <div className="close-button">
            </div>
            <div className="close-button">
            </div>
        </div>
    )
}
