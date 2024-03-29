import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(!followed);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }
  // only show profiles that are not followed
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} avatar`}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
        <Link to={`/p/${username}`} aria-label={`${username} profile`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired
};
