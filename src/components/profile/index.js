import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { getUserPhotosByUserId } from '../../services/firebase';
import Photos from './photos';

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: undefined,
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    if (user) {
      getProfileInfoAndPhotos();
    }
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullname: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};
