import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../redux/posts/actions";
import { UnlikeIcon, LikeIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";

const selectState = (state) => ({
  isFetchingPost: state.posts.isFetchingPost,
  isLoggedIn: state.auth.isLoggedIn,
});

function LikeButton({ id, liked }) {
  const classes = useFeedPostStyles();
  const dispatch = useDispatch();
  const state = useSelector(selectState);

  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = () => {
    if (state.isFetchingPost || !state.isLoggedIn) return;
    liked ? handleUnlike() : handleLike();
  };

  function handleLike() {
    dispatch(postsActions.likePostWorker(id));
  }

  function handleUnlike() {
    dispatch(postsActions.unlikePostWorker(id));
  }

  return <Icon className={className} onClick={onClick} />;
}

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default LikeButton;
