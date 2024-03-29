import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    // update the comment list and push the changes to the firestore database
    event.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        action=""
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          placeholder="Add a comment..."
          name="add-comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />

        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          disabled={comment.length < 1}
          type="button"
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
