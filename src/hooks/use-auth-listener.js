import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  // hook for user authentication
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // if use is authenticated, save the session data to local storage and change the use state
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // clean the session data
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);

  return { user };
}
