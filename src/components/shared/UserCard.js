import React from "react";
import PropTypes from 'prop-types';
import { useUserCardStyles } from "../../styles";
import { Avatar, Typography } from "@material-ui/core";

function UserCard({ user, avatarSize = 44 }) {
  const classes = useUserCardStyles({ avatarSize });
  const {
    username,
    name,
    profile_image: { medium: profile_image },
    links: { html: user_link },
  } = user;

  return (
    <div className={classes.wrapper}>
      <a href={user_link} target="_blank" rel="noopener noreferrer">
        <Avatar
          src={profile_image}
          alt="User avatar"
          className={classes.avatar}
        />
      </a>
      <div className={classes.nameWrapper}>
        <a href={user_link} target="_blank" rel="noopener noreferrer">
          <Typography variant="subtitle2" className={classes.typography}>
            {username}
          </Typography>
        </a>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  avatarSize: PropTypes.number,
};

export default React.memo(UserCard);
