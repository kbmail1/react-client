import './App.scss'
import Header from './common/Header'
import Footer from './common/Footer'
import Dictionary from './dict/Dictionary'

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Dictionary />
      <Footer />
    </div>
  )
}

export default App
