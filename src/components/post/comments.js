import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  const [showAllComments, setShowAllComments] = useState(false);
  const handleViewComments = () => setShowAllComments((showAllComments) => !showAllComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <button
            type="button"
            onClick={handleViewComments}
            onKeyDown={(event) => {
              if (event.target === 'Enter') handleViewComments();
            }}
          >
            <p className="text-sm text-gray-base mb-1 cursor-pointer">{`${
              showAllComments ? 'Hide comments' : 'View all comments'
            }`}</p>
          </button>
        )}
        {comments.slice(0, showAllComments ? comments.length : 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="uppercase text-gray-base text-xs">{formatDistance(posted, new Date())}</p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object
};
