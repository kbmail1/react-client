import './App.scss'
import Header from './common/Header'
import Footer from './common/Footer'
import Dictionary from './dict/Dictionary'
import Landing from './Landing'
// import Login from './Login'
import roles from './auth/roles.json'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

// note - LInks aare in header.
const App = (props) => {
  return (
    <>
      <div className="app-container">
        <Header role={props.role} />
          <Outlet />
        <Footer />
      </div>

    </>
  )
}

export default App
