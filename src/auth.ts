import axios from 'axios'

const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(email, password, username, callback: VoidFunction) {

    console.log(`signin: ${email} ${password}, ${username}`)

    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signOut(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

export { fakeAuthProvider };
