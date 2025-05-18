// src/Router.tsx
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// 懒加载应用组件
const FirstPage = lazy(() => import('./Pages/FirstPage/index.tsx'))
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
