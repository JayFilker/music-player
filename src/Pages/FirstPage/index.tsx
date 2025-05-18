import './index.less'
import { SongList } from '../../components/SongList'
import {Foryou} from '../../components/Foryou'
import {SongerList} from '../../components/SongerList'

export default function FirstPage() {
    return <div className="home">
        <div className="index-row first-row">
            <div className="title"> by Apple Music</div>
            <SongList
                songList={[
                    {
                        title: 'Song List',
                        des: 'by Apple Music',
                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                        content: [{
                            title: 'Song 1',
                            artist: ['Artist 1', 'ddd'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song2.mp3',
                            from: 'The Band CAMINO'
                        }, {
                            title: 'Song 2',
                            artist: ['Artist 1', 'fff'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song3.mp3',
                            from: 'The Band CAMINO'
                        }]
                    },
                
                ]}
            ></SongList>
        </div>
        <div className="index-row">
            <div className="title">
                推荐歌单
            </div>
            <SongList
                songList={[
                    {
                        title: 'Song List',
                        des: 'by Apple Music',
                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                        content: [{
                            title: 'Song 1',
                            artist: ['Artist 1', 'ddd'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song2.mp3',
                            from: 'The Band CAMINO'
                        }, {
                            title: 'Song 2',
                            artist: ['Artist 1', 'fff'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song3.mp3',
                            from: 'The Band CAMINO'
                        }]
                    },
                
                ]}
            ></SongList>
        </div>
        <div className="index-row">
            <div className="title"> For You</div>
                <Foryou></Foryou>
        </div>
        <div className="index-row">
            <div className="title">
                推荐艺人
            </div>
            <SongerList artist={[{
                name:'毛不易',
                personSongList:[{
                    title: 'Song 1',
                    artist: ['Artist 1', 'ddd'],
                    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                    song: '/music/song2.mp3',
                    from: 'The Band CAMINO'
                }, {
                    title: 'Song 2',
                    artist: ['Artist 1', 'fff'],
                    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                    song: '/music/song3.mp3',
                    from: 'The Band CAMINO'
                }],
                imgPic: 'https://p2.music.126.net/svHK8nEPa8J42tJ1by7jrw==/109951169875194361.jpg?param=512y512',
            }]}></SongerList>
        </div>
        <div className="index-row">
            <div className="title">
                新专速递
            </div>
            <SongList
                songList={[
                    {
                        title: 'Song List',
                        des: 'by Apple Music',
                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                        content: [{
                            title: 'Song 1',
                            artist: ['Artist 1', 'ddd'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song2.mp3',
                            from: 'The Band CAMINO'
                        }, {
                            title: 'Song 2',
                            artist: ['Artist 1', 'fff'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song3.mp3',
                            from: 'The Band CAMINO'
                        }]
                    }
                
                ]}
            ></SongList>
        </div>
        <div className="index-row">
            <div className="title">
                排行榜
            </div>
            <SongList
                songList={[
                    {
                        title: 'Song List',
                        des: 'by Apple Music',
                        imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                        content: [{
                            title: 'Song 1',
                            artist: ['Artist 1', 'ddd'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song2.mp3',
                            from: 'The Band CAMINO'
                        }, {
                            title: 'Song 2',
                            artist: ['Artist 1', 'fff'],
                            imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
                            song: '/music/song3.mp3',
                            from: 'The Band CAMINO'
                        }]
                    }
                
                ]}
            ></SongList>
        </div>
    </div>
}
