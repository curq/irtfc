import { Link, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD); // after succesfully sign in redirect the user to the dashboard
    } catch (error) {
      setEmail('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login — Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col rounded items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="instagram" className="mt-2 w-6/12 mb-4" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="post">
            <input
              type="text"
              aria-label="Enter Your email address"
              placeholder="Email address"
              className="focus:outline-none focus:border-blue-medium text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded mb-2 border border-gray-primary "
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              type="password"
              aria-label="Enter Your email password"
              placeholder="Password"
              className="focus:outline-none focus:border-blue-medium text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded mb-2 border border-gray-primary"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              }`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
          <p className="text-s">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium" aria-label="Signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
