import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/actions";
import { api } from "../../REST";

import { useNavbarStyles } from "../../styles";
import {
  AppBar,
  Hidden,
  InputBase,
  Avatar,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { LoadingIcon, HomeIcon, HomeActiveIcon } from "../../icons";
import { useNProgress } from "@tanem/react-nprogress";

const selectState = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  profile: state.auth.profile,
  isFetchingAuth: state.auth.isFetchingPost,
  hasError: state.auth.hasError,
  errorMessage: state.auth.errorMessage,
});

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const location = useLocation();
  const [isLoadingPage, setLoadingPage] = React.useState(true);
  const path = history?.location.pathname;

  const state = useSelector(selectState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoadingPage(false);
  }, [path]);

  React.useEffect(() => {
    if(!state.isLoggedIn) {
      const token = location.search.split("code=")[1];
      const error = location.search.split("error_description=")[1];
      const errorMessage = error ? error.replace(/\+/g, " ") : "";
  
      if (errorMessage) {
        dispatch(authActions.emitErrorAuth(errorMessage));
        return null;
      }
  
      if (token) {
        dispatch(authActions.authenticate(token));
      }
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    dispatch(authActions.clearErrorAuth());
  };

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>

      <Snackbar
        open={state.hasError}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity="error"
        >
          {state?.errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

Navbar.propTypes = {
  minimalNavbar: PropTypes.bool,
};

function Logo() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

function Search() {
  const classes = useNavbarStyles();
  const [loading] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!query.trim()) return;
  }, [query]);

  function handleClearInput() {
    setQuery("");
  }

  return (
    <Hidden xsDown>

        <InputBase
          className={classes.input}
          onChange={(event) => setQuery(event.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={handleClearInput} className={classes.clearIcon} />
            )
          }
          placeholder="Search"
          value={query}
        />

    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const state = useSelector(selectState);
  const login = () => {
    const userPermissions = ["public", "read_user", "write_likes"];
    const authenticationUrl = api.auth.login(userPermissions);
    window.location.assign(authenticationUrl);
  };
  return (
    <div className={classes.linksContainer}>
      <div className={classes.linksWrapper}>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        {!state.isLoggedIn && (
          <Button
            variant={"contained"}
            color="primary"
            className={classes.button}
            fullWidth
            onClick={() => login()}
            disabled={state.isFetchingAuth || state.hasError}
          >
            Login
          </Button>
        )}
        {state.isLoggedIn && (
          <Link to={`/user/${state.profile.username}`}>
            <div
              className={
                path === `/user/${state.profile.username}`
                  ? classes.profileActive
                  : ""
              }
            />
            <Avatar
              src={state.profile.profile_image.small}
              className={classes.profileImage}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

Links.propTypes = {
  path: PropTypes.string.isRequired,
};

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  );
}

Progress.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
};

export default React.memo(Navbar);
