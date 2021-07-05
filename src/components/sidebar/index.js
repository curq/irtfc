import { useContext } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Suggestions from './suggestions';
import User from './user';

export default function Sidebar() {
  const { user: { fullname, username, userId, following, docId = '' } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className="pb-4 pl-4 pr-4">
      <User username={username} fullname={fullname} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}
