import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Login — Instagram';
  }, []);

  return <p>I am the login page</p>;
}
