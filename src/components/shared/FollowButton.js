import React from "react";
import PropTypes from "prop-types";
import { useFollowButtonStyles } from "../../styles";
import { Button } from "@material-ui/core";

function FollowButton({
  user: {
    links: { html: user_link },
  },
  side,
}) {
  const classes = useFollowButtonStyles({ side });

  const followButton = (
    <a href={user_link} target="_blank" rel="noopener noreferrer">
      <Button
        variant={side ? "text" : "contained"}
        color="primary"
        className={classes.button}
        fullWidth
      >
        Follow
      </Button>
    </a>
  );

  return followButton;
}

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default FollowButton;
