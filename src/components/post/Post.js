import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import LikeButton from "../shared/LikeButton";
import { MoreIcon } from "../../icons";
import { Typography } from "@material-ui/core";
import OptionsDialog from "../shared/OptionsDialog";
import PostSkeleton from "./PostSkeleton";
import { getFormattedDate } from "../../utils/dateFormat";

const selectState = (state) => ({
  posts: state.posts.posts,
});

function Post({ id }) {
  const classes = usePostStyles();
  const [loading, setLoading] = React.useState(true);
  const [showOptionsDialog, setOptionsDialog] = React.useState(false);

  const state = useSelector(selectState);

  const {
    urls: { small: media },
    likes,
    user,
    updated_at,
    liked_by_user,
    alt_description = "Empty description",
    links: { html: linkToPost },
  } = state.posts.find((post) => post.id === id);

  setTimeout(() => setLoading(false), 1000);
  if (loading) return <PostSkeleton />;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setOptionsDialog(true)}
          />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton id={id} liked={liked_by_user} />
          </div>
          {likes > 0 && (
            <Typography className={classes.likes} variant="subtitle2">
              <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
            </Typography>
          )}
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="body2"
              component="span"
              className={classes.postCaption}
              dangerouslySetInnerHTML={{ __html: alt_description }}
            />
          </div>
          <Typography color="textSecondary" className={classes.datePosted}>
            {getFormattedDate(updated_at)}
          </Typography>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog
          linkToPost={linkToPost}
          onClose={() => setOptionsDialog(false)}
        />
      )}
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(Post);
