// import { useState } from 'react'
import './App.css'
// import {FirstPage} from './Pages/FirstPage'
import {Player} from './components/Bottom'
import {TopList} from './components/TopList'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
      <BrowserRouter>
      <div id="app" >
          <TopList></TopList>
          <main>
              <Router></Router>
      </main>
        
            <Player></Player>
</div></BrowserRouter>
  )
}

export default App
