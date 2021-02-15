import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import LikeButton from "../shared/LikeButton";
import { Typography } from "@material-ui/core";
import FollowSuggestions from "../shared/FollowSuggestions";
import FeedPostImage from "./FeedPostImage";
import { getFormattedDate } from "../../utils/dateFormat";

function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const {
    id,
    urls: { small: media },
    likes,
    user,
    updated_at,
    liked_by_user,
    alt_description,
  } = post;
  const showFollowSuggestions = index === 1;

  const history = useHistory();

  function handleOpenPostModal() {
    history.push({
      pathname: `/${post.id}`,
      state: { modal: true },
    });
  }

  return (
    <>
      <article
        className={classes.article}
        style={{ marginBottom: showFollowSuggestions && 30 }}
      >
        {/* Feed Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} />
        </div>
        {/* Feed Post Image */}
        <FeedPostImage
          handleOpenPostModal={handleOpenPostModal}
          media={media}
          altDescription={alt_description}
          classImage={classes.image}
        />
        {/* Feed Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          <LikeButton id={id} liked={liked_by_user} />
          {likes > 0 && (
            <Typography className={classes.likes} variant="subtitle2">
              <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
            </Typography>
          )}
          <Typography color="textSecondary" className={classes.datePosted}>
            {getFormattedDate(updated_at)}
          </Typography>
        </div>
      </article>
      {showFollowSuggestions && <FollowSuggestions />}
    </>
  );
}

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default FeedPost;
