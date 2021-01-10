import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth/actions";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import ProfilePicture from "../components/shared/ProfilePicture";

import {
  Hidden,
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  Zoom,
  Divider,
  DialogTitle,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GearIcon } from "../icons";
import ProfileTabs from "../components/profile/ProfileTabs";

const selectState = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  profile: state.auth.profile,
  isFetchingAuth: state.auth.isFetchingPost,
  hasError: state.auth.hasError,
  errorMessage: state.auth.errorMessage,
});

function ProfilePage() {
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setOptionsMenu] = React.useState(false);

  const state = useSelector(selectState);
  const {profile_image: { large: image }} = state.profile;

  const isOwner = true;

  function handleOptionsMenuClick() {
    setOptionsMenu(true);
  }

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  return (
    <Layout title={`${state.profile.name} (@${state.profile.username})`}>
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture image={image} isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                user={state.profile}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={state.profile} />
              <NameBioSection user={state.profile} />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture image={image} size={77} isOwner={isOwner} />
                <ProfileNameSection
                  user={state.profile}
                  isOwner={isOwner}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                />
              </section>
              <NameBioSection user={state.profile} />
            </CardContent>
            <PostCountSection user={state.profile} />
          </Card>
        </Hidden>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        <ProfileTabs user={state.profile} isOwner={isOwner} />
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);

  let followButton;
  const isFollowing = true;
  const isFollower = false;
  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant="outlined"
        className={classes.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)} />
      )}
    </>
  );
}

ProfileNameSection.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  handleOptionsMenuClick: PropTypes.func.isRequired,
};

function UnfollowDialog({ onClose, user }) {
  const classes = useProfilePageStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper,
      }}
      onClose
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align="center"
        variant="body2"
        className={classes.unfollowDialogText}
      >
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton}>Unfollow</Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

UnfollowDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        <div className={classes.followingText}>
          <Typography className={classes.followingCount}>
            {user.photos.length}
          </Typography>
          <Hidden xsDown>
            <Typography>posts</Typography>
          </Hidden>
          <Hidden smUp>
            <Typography color="textSecondary">posts</Typography>
          </Hidden>
        </div>

        <div className={classes.followingText}>
          <Typography className={classes.followingCount}>
            {user.followers_count}
          </Typography>
          <Hidden xsDown>
            <Typography>followers</Typography>
          </Hidden>
          <Hidden smUp>
            <Typography color="textSecondary">followers</Typography>
          </Hidden>
        </div>

        <div className={classes.followingText}>
          <Typography className={classes.followingCount}>
            {user.following_count}
          </Typography>
          <Hidden xsDown>
            <Typography>following</Typography>
          </Hidden>
          <Hidden smUp>
            <Typography color="textSecondary">following</Typography>
          </Hidden>
        </div>
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setLogOutMessage] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogOutClick() {
    setLogOutMessage(true);
    dispatch(authActions.logout());
    history.push("/");
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

OptionsMenu.propTypes = {
  handleCloseMenu: PropTypes.func.isRequired,
};

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

OptionsItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProfilePage;
