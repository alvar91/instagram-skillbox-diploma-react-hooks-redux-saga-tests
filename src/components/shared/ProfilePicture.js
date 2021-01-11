import React from "react";
import PropTypes from "prop-types";
import { useProfilePictureStyles } from "../../styles";
import { Person } from "@material-ui/icons";

function ProfilePicture({ size, image, isOwner }) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.wrapper}>
          <img src={image} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  );
}

ProfilePicture.propTypes = {
  size: PropTypes.number,
  image: PropTypes.string,
  isOwner: PropTypes.bool.isRequired,
};

export default ProfilePicture;
