import { createContext } from 'react';

// context to provide the data about current user (logged in or not)
const UserContext = createContext(null);

export default UserContext;
