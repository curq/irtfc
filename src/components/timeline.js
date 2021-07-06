/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  // if api call to get photos is still in process, do skeleton loading animation
  // then if got any photos render the posts, else encourage to follow people
  return (
    <div className="container col-span-3 md:col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
}
