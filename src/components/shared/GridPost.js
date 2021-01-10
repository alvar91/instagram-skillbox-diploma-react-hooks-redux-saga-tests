import React from 'react';
import PropTypes from 'prop-types';
import { useGridPostStyles } from '../../styles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getFormattedDate } from "../../utils/dateFormat";

function GridPost({ post }) {
  const { urls: {small: media} } = post;
  const history = useHistory();
  const classes = useGridPostStyles();

  function handleOpenPostModal() {
    history.push({
      pathname: `/${post.id}`,
      state: { modal: true },
    });
  }

  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <Typography>{getFormattedDate(post.updated_at)}</Typography>
        </div>
      </div>
      <img src={media} alt="Post cover" className={classes.image} />
    </div>
  );
}

GridPost.propTypes = {
  post: PropTypes.object.isRequired,
};


export default GridPost;
