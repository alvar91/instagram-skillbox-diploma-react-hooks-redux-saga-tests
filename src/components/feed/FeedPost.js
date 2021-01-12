import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import LikeButton from "../shared/LikeButton";
import { Typography } from "@material-ui/core";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionsDialog from "../shared/OptionsDialog";
import { getFormattedDate } from "../../utils/dateFormat";

function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const [showOptionsDialog, setOptionsDialog] = React.useState(false);
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
        <div onClick={handleOpenPostModal}>
          <img src={media} alt={alt_description} className={classes.image} />
        </div>
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
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setOptionsDialog(false)} />
      )}
    </>
  );
}

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default FeedPost;
