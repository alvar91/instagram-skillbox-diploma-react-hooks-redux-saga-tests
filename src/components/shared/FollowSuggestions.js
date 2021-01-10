import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useFollowSuggestionsStyles } from "../../styles";
import { Typography } from "@material-ui/core";
import { LoadingLargeIcon } from "../../icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FollowSuggestionsItem from "./FollowSuggestionsItem";

function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();

  let loading = false;

  const selectState = (state) => ({
    users: state.posts.users,
  });

  const state = useSelector(selectState);

  return (
    <div className={classes.container}>
      {!hideHeader && (
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
      )}
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={classes.slide}
          dots={false}
          infinite
          speed={1000}
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing="ease-in-out"
        >
          {state.users.slice(3).map((user) => (
            <FollowSuggestionsItem key={user.id} user={user} />
          ))}
        </Slider>
      )}
    </div>
  );
}

FollowSuggestions.propTypes = {
  hideHeader: PropTypes.bool,
};

export default React.memo(FollowSuggestions);
