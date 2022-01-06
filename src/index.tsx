import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import About from './About'
import PWA from './PWA'
import Hangman from './hangman/Hangman'
import Dictionary from './dict/Dictionary'
import NotFound from './NotFound'
import Login from './Login'
import './index.scss'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/dict" element={<Dictionary />} />
        <Route path="/about" element={<About />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/pwa" element={<PWA />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={< NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
