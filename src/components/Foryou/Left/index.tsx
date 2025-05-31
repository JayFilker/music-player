import { SvgIcon } from '../../SvgIcon'
import { svgList } from '../svg'

export function Left() {
    const title = ['每', '日', '推', '荐']
    return (
        <div className="daily-recommend-card">
            <img
                id="left-img"
                src="https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg?param=1024y1024"
                loading="lazy"
                alt=""
            />
            <div className="container">
                <div className="title-box">
                    <div className="title">
                        {
                            title.map((item, index) => (
                                <span
                                    key={index}
                                >
                                    {item}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <button
                className="play-button"
            >
                <SvgIcon>
                    {svgList.button}
                </SvgIcon>
            </button>
        </div>
    )
}
