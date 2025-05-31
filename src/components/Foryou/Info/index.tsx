export function Info(props: any) {
    const { randomAlbum } = props
    return (
        <div className="info">
            <div className="title">{randomAlbum?.albums?.items[0].name}</div>
            <div className="artist">
                <span
                    className="artist-in-line"
                >
                    <span>
                        <a
                            href="#/artist/12448205"
                            id="info-span"
                        >
                            {randomAlbum?.albums?.items[0].artists[0].name}
                        </a>
                    </span>
                </span>
            </div>
        </div>
    )
}
