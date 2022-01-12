import * as React from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import Dictionary from './dict/Dictionary';
import About from './About'
import Crossword from './Crossword';
import Hangman from './hangman/Hangman';
import TestJWT from './TestJWT'
import Header from './common/Header'
import './App.scss'
import axios from 'axios';
// import LoginPage from './LoginPage'

interface AuthContextType {
  email: any;
  username: any;
  signIn: (email: string, password: string, username: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
export const AuthContext = React.createContext<AuthContextType>(null!);

const restUrl = `https://localhost:8888/login`

const AuthProvider = () => {
  let [username, setUsername] = React.useState('')
  let [email, setEmail] = React.useState('')

  let signIn = (email: string, password: string, username: string, callback: VoidFunction) => {
    console.log('in this signin - ')
    axios.post(restUrl, {
      email,
      username,
      password,
    })
      .then((res) => {
        console.log(`looks good: ***', ${res}`)
        console.log(`response.data: ${res.data}`)
        // if token - store in localstorage.  reuse in next request.
        localStorage.setItem('jwt_token', res.data.token)
        setUsername(username)
        callback()
      })
      .catch((err) => {
        console.log('error ', err)
      })
  }

  let signOut = (callback: VoidFunction) => {
    setUsername('')
    setTimeout(callback, 100)
  };

  return { email, username, signIn, signOut }
}

const App = () => {
  return (
    <AuthContext.Provider value={AuthProvider()}>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/crossword" element={<Crossword />} />

          <Route path="/testjwt" element={
            <RequireAuth>
              <TestJWT />
            </RequireAuth>
          }
          />

          <Route path="/hangman" element={
            <RequireAuth>
              <Hangman />
            </RequireAuth>
          }
          />
        </Route>

      </Routes>
    </AuthContext.Provider>
  );
}

function Layout() {
  // if (!auth.username)  =>  guest.
  let auth = React.useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <div>
      <ul className="layout-menu">
        <li className="layout-menu__item">
          <Link to="/">About</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/crossword">Crossword</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/hangman">Hangman</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/testjwt">TestJWT</Link>
        </li>

        {
          auth.username &&
          <li className="layout-menu__item">
            <a href="javascript:;"
              onClick={() => {
                auth.signOut(() => navigate("/"));
              }}
            >
              Sign out
            </a>
          </li>
        }

      </ul >

      <Outlet />
    </div >
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  if (!auth.username) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer username experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = React.useContext(AuthContext);

  let from = location.state?.from?.pathname || "/";
  console.log(`LoginPage: from: ${from}`)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.signIn(email, password, username, () => {
      console.log('just before navigate in signIn')
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>{" "}<br />
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}<br />
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}<br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App