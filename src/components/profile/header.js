import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    followers,
    fullname,
    following,
    username: profileUsername
  }
}) {
  const { user: loggedInUser } = useContext(UserContext); // get the current user from the context
  const { user } = useUser(loggedInUser?.uid); // gets the user data if logged in, else gets falsy user
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user.username !== profileUsername; // show follow|unfollow button if user is logged in

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });

    await toggleFollow(isFollowingProfile, user.docId, profileUserId, profileDocId, user.userId); // toggles following and updates both the following user and the user that is followed
  };

  useEffect(() => {
    const isLoggedUserFollowingProfile = async () => {
      const isFollowing = user.following.includes(profileUserId);
      setIsFollowingProfile(isFollowing);
    };

    if (user?.following && profileUserId) {
      isLoggedUserFollowingProfile();
    }
  }, [user?.following, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile`}
            className="rounded-full h-40 w-40 flex"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton circle width={150} height={150} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={2} width={400} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> {` `}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium" />
          {!fullname ? <Skeleton count={1} height={24} width={400} /> : fullname}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullname: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};
