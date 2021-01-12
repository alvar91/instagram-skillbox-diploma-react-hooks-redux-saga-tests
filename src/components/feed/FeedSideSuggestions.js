import React from "react";
import { useSelector } from "react-redux";

import { useFeedSideSuggestionsStyles } from "../../styles";
import { Paper, Typography } from "@material-ui/core";
import UserCard from "../shared/UserCard";
import FollowButton from "../shared/FollowButton";
import { LoadingIcon } from "../../icons";

function FeedSideSuggestions() {
  const classes = useFeedSideSuggestionsStyles();

  const selectState = (state) => ({
    users: state.posts.users,
    isFetchingPost: state.posts.isFetchingPost,
  });

  const state = useSelector(selectState);

  return (
    <article className={classes.article}>
      <Paper className={classes.paper}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
        {state.isFetchingPost ? (
          <LoadingIcon />
        ) : (
          state.users.slice(-6).map((user) => (
            <div key={user.id} className={classes.card}>
              <UserCard user={user} />
              <FollowButton user={user} side />
            </div>
          ))
        )}
      </Paper>
    </article>
  );
}

export default React.memo(FeedSideSuggestions);
