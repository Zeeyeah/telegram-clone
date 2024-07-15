import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'
import { useEffect } from 'react'

function App() {

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
