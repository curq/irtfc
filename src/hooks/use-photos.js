import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  // hook to get the photos (posts' data) for the dashboard timeline
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // sort photos by date
        setPhotos(followedUserPhotos);
      }
    }
    if (user?.following?.length === 0) {
      setPhotos([]);
    }
    getTimelinePhotos();
  }, [user]);

  return { photos };
}
