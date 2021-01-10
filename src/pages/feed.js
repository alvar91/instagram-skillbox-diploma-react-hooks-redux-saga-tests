import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../redux/posts/actions";

import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";

import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

import usePageBottom from "../utils/usePageBottom";

import UserCard from "../components/shared/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import { Hidden } from "@material-ui/core";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));

const selectState = (state) => ({
  // Posts
  currentPage: state.posts.currentPage,
  posts: state.posts.posts,
  isFetchingPost: state.posts.isFetchingPost,
  hasError: state.posts.hasError,
  errorMessage: state.posts.errorMessage,

  // Profile
  profile: state.auth.profile,
  isLoggedIn: state.auth.isLoggedIn,
});

function FeedPage() {
  const classes = useFeedPageStyles();

  const state = useSelector(selectState);
  const dispatch = useDispatch();

  // Lazy loading posts
  const isPageBottom = usePageBottom();

  React.useEffect(() => {
    if (!Object.keys(state.posts).length) {
      fetchData(state.currentPage);
    }
    // eslint-disable-next-line
  }, []);

  const fetchData = (pageNumber) => {
    if (state.isFetchingPost) return;
    dispatch(postsActions.fetchPosts(pageNumber));
  };

  React.useEffect(() => {
    let pageNumber = state.currentPage;
    pageNumber += 1;
    const timerId = isPageBottom ? setTimeout(fetchData, 200, pageNumber) : null;
    return () => {
      if (!timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line
  }, [isPageBottom]);

  const navigateToHomePage = React.useCallback(() => {
    window.location.reload();
  }, []);

  // Error handling
  if (state.hasError) {
    return (
      <Layout minimalNavbar title="Error page" marginTop={120}>
        <Typography variant="h5" align="center" paragraph>
          {state.errorMessage
            ? state.errorMessage
            : "Sorry, something went wrong."}
        </Typography>
        <Typography align="center" onClick={() => navigateToHomePage()}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigateToHomePage()}
            fullWidth
          >
            Go back to Instagram.
          </Button>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout title="Feed page">
      <div>
        <div className={classes.container}>
          {/* Feed Posts */}
          <div>
            {state.posts.map((post, index) => (
              <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                <FeedPost key={post.id} index={index} post={post} />
              </React.Suspense>
            ))}
          </div>
          {/* Sidebar */}
          <Hidden smDown>
            <div className={classes.sidebarContainer}>
              <div className={classes.sidebarWrapper}>
                {state.isLoggedIn && (
                  <UserCard user={state.profile} avatarSize={50} />
                )}
                <FeedSideSuggestions />
              </div>
            </div>
          </Hidden>
          {state.isFetchingPost && <LoadingLargeIcon />}
        </div>
      </div>
    </Layout>
  );
}

export default React.memo(FeedPage);
