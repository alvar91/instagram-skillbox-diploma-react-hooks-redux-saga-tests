/**
 * Function to create a mock store with input options
 * @param {object} storeOptionsObj contains options to create the mock store
 * @returns {object} mock store
 */
export const mockFactoryStore = ({postsObj = {}, usersObj = {}, authObj = {}}) => {
  const {
    posts = [],
    currentPage = 1,
    isFetchingPost = false,
    hasErrorPosts = false,
    errorMessagePosts = "",
  } = postsObj;

  const { users = [] } = usersObj;

  const {
    isFetchingAuth = false,
    isLoggedIn = false,
    profile = [],
    hasErrorAuth = false,
    errorMessageAuth = "",
  } = authObj;

  return {
    /* posts state */
    posts: {
      isFetchingPost: isFetchingPost,
      currentPage: currentPage,
      posts: posts,
      users: users,
      hasError: hasErrorPosts,
      errorMessage: errorMessagePosts,
    },
    /* auth state */
    auth: {
      isFetchingAuth: isFetchingAuth,
      isLoggedIn: isLoggedIn,
      profile: profile,
      hasError: hasErrorAuth,
      errorMessage: errorMessageAuth,
    },
  };
};
