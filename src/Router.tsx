// src/Router.tsx
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// 懒加载应用组件
const FirstPage = lazy(() => import('./pages/FirstPage/index.tsx'))
const Discover = lazy(() => import('./pages/Discover'))
const Artist = lazy(() => import('./pages/Artist/index.tsx'))
const MusicLibrary = lazy(() => import('./pages/MusicLibrary/index.tsx'))
const More = lazy(() => import('./pages/More/index.tsx'))
const NextTracks = lazy(() => import('./pages/NextTracks/index.tsx'))
const Set = lazy(() => import('./pages/Set/index.tsx'))
const PlaysList = lazy(() => import('./pages/PlaysList/index.tsx'))
const Login = lazy(() => import('./pages/Login/index.tsx'))
const MoviePage = lazy(() => import('./pages/MoviePage/index.tsx'))
const Search = lazy(() => import('./pages/Search/index.tsx'))
const SearchDemo = lazy(() => import('./pages/SearchDemo/index.tsx'))
const CallbackPage = lazy(() => import('./pages/CallbackPage'))
// const App2 = lazy(() => import('./apps/swiper/App'))
// const App3 = lazy(() => import('./apps/axios/App.tsx'))

// 创建加载组件
const Loading = () => <div>Loading...</div>

export const Router: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* 默认重定向到 app1 */}
                <Route path="/" element={<Navigate to="/firstpage" />} />

                {/* 应用1的路由 */}
                <Route path="/firstpage/*" element={<FirstPage />} />
                <Route path="/discover/*" element={<Discover />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/more/*" element={<More />} />
                <Route path="/nextTracks/*" element={<NextTracks />} />
                <Route path="/set/*" element={<Set />} />
                <Route path="/musicLibrary/*" element={<MusicLibrary />} />
                <Route path="/artist/*" element={<Artist />} />
                <Route path="/moviePage/*" element={<MoviePage />} />
                <Route path="/search/*" element={<Search />} />
                <Route path="/searchDemo/*" element={<SearchDemo />} />
                <Route path="/playsList*" element={<PlaysList />} />
                <Route path="/callback/*" element={<CallbackPage />} />

                {/* /!* 应用2的路由 *!/ */}
                {/* <Route path="/app2/*" element={<App2 />} /> */}

                {/* /!* 应用3的路由 *!/ */}
                {/* <Route path="/app3/*" element={<App3 />} /> */}

                {/* 404 页面 */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Suspense>
    )
}
