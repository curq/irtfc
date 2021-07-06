import { useContext } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Suggestions from './suggestions';
import User from './user';

// renders sidebar with user(avatar, fullname) and suggested profiles
export default function Sidebar() {
  const {
    user: { fullname, username, userId, following, docId = '' } = {} // use an empty object as default will api call is still in proccess
  } = useContext(LoggedInUserContext);

  return (
    <div className="pb-4 pl-4 pr-4 hidden md:block">
      <User username={username} fullname={fullname} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}
