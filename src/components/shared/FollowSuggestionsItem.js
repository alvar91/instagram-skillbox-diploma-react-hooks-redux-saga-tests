import React from 'react';
import PropTypes from 'prop-types';
import { useFollowSuggestionsStyles } from '../../styles';
import { Typography, Avatar } from '@material-ui/core';
import FollowButton from './FollowButton';

function FollowSuggestionsItem({ user }) {
    const classes = useFollowSuggestionsStyles();
    const { profile_image: { small: profile_image }, username, name, links: {html: user_link} } = user;
  
    return (
      <div>
        <div className={classes.card}>
          <a href={user_link} target="_blank" rel="noopener noreferrer">
            <Avatar
              src={profile_image}
              alt={`${username}'s profile`}
              classes={{
                root: classes.avatar,
                img: classes.avatarImg,
              }}
            />
          </a>
          <a href={user_link} target="_blank" rel="noopener noreferrer">
            <Typography
              variant="subtitle2"
              className={classes.text}
              align="center"
            >
              {username}
            </Typography>
          </a>
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.text}
            align="center"
          >
            {name}
          </Typography>
          <FollowButton user={user} side={false} />
        </div>
      </div>
    );
  }

  FollowButton.propTypes = {
    user: PropTypes.object.isRequired,
  };

  export default React.memo(FollowSuggestionsItem);
