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
import PWA from './PWA';
import Hangman from './hangman/Hangman';
import Header from './common/Header'
import { fakeAuthProvider } from './auth'
import './App.scss'

interface AuthContextType {
  email: any;
  user: any;
  signIn: (email: string, password: string, user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
let AuthContext = React.createContext<AuthContextType>(null!);


const AuthProvider = () => {
  let [user, setUser] = React.useState<any>(null);
  let [email, setEmail] = React.useState<any>(null);

  let signIn = (email: string, password: string, user: string, callback: VoidFunction) => {
    return fakeAuthProvider.signIn(email, password, user, () => {
      setUser(user);
      callback();
    });
  };

  let signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      setEmail(null)
      callback();
    });
  };

  return { email, user, signIn, signOut };
}

export default function App() {
  return (
    <AuthContext.Provider value={AuthProvider()}>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/login" element={<LoginPage />} />

        <Route path="/pwa" element={
              <RequireAuth>
                <PWA />
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
  let auth = React.useContext(AuthContext);

  return (
    <div>
      <AuthStatus />

      <ul className="layout-menu">
        <li className="layout-menu__item">
          <Link to="/">About</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/pwa">PWA Page</Link>
        </li>
        <li className="layout-menu__item">
          <Link to="/hangman">Hangman page</Link>
        </li>
        <li className="layout-menu__item">
          { /* auth.signOut(() => navigate("/")); */}
          <Link className={`${auth.user ? "" : "display-none"}`} to="/">x{auth.user}x</Link>
        </li>
      </ul >

      <Outlet />
    </div >
  );
}

function AuthStatus() {
  let auth = React.useContext(AuthContext);
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signOut(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
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
    let password = formData.get("password") as string;
    let username = formData.get("username") as string;

    auth.signIn(email, password, username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
        navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>{" "}<br/>
        <label>
          Username: <input type="text" name="username" />
        </label>{" "}<br/>
        <label>
          Password: <input name="username" type="password" />
        </label>{" "}<br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}