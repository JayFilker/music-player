// import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
// import {FirstPage} from './Pages/FirstPage'
import { Player } from './components/Bottom'
import { Lyrics } from './components/Lyrics'
import { TopList } from './components/TopList'
import { Router } from './Router'

const queryClient = new QueryClient()
import './App.css'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div id="app">
                    <TopList></TopList>
                    <main>
                        <Router></Router>
                    </main>

                    <Player></Player>
                    <Lyrics></Lyrics>
                </div>
            </BrowserRouter>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    )
}

export default App
