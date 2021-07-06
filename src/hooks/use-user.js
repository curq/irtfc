import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  // hook to get the user data
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);
  return { user: activeUser };
}
