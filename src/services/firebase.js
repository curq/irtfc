import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUserName(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(), // spread the array returned by .data() method -> get all data
    docId: item.id // docId is used to easily access and edit firestore document in other functions
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();
  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id
    }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // logged in user that will follow
  profileId, // the user that is requested to follow
  isFollowing // is logged user already following requested user?
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowing ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId) // if user was already following -> stop following | else -> start following
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // logged in user that will follow
  loggedInUserDocId, // the user that is requested to follow
  isFollowing // is logged user already following requested user?
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(loggedInUserDocId) // if logged user was following the given user before -> remove logged user from followers
        : FieldValue.arrayUnion(loggedInUserDocId) // else add the logged user to followers list
    });
}

export async function getPhotos(userId, following) {
  // get the photos of all the users that logged in user is currently following
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    // get all the details of each photo for the post components (likes, comments, did the user liked the photo?)
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) userLikedPhoto = true;

      const user = await getUserByUserId(photo.userId); // returns one element array with user object [{user}]
      const { username } = user[0]; // get username of user that posted the photo

      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
  // get all photos (with data) of user wtih the given id
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  // check if logged user is following the given profile
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // get the user data by username
    .where('following', 'array-contains', profileUserId) // match profileUserId with Ids in the following array
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileUserId,
  profileDocId,
  activeUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, activeUserId, isFollowingProfile);
  return 1;
}
