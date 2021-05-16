import { Link, useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullname('');
        setEmail('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('The username is taken, please try another.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up — Instagram';
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

          <form onSubmit={handleSignUp} method="post">
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="focus:outline-none focus:border-blue-medium text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded mb-2 border border-gray-primary "
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />

            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full Name"
              className="focus:outline-none focus:border-blue-medium text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded mb-2 border border-gray-primary "
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            />

            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="focus:outline-none focus:border-blue-medium text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded mb-2 border border-gray-primary "
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <input
              type="password"
              aria-label="Enter your password"
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
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
          <p className="text-s">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
