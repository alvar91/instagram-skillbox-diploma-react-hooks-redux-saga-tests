import unsplash from "./unsplash";

export const api = {
  posts: {
    fetch(pageNumber = 1) {
      return unsplash.photos.listPhotos(pageNumber, 10, "latest");
    },

    like(id) {
      return unsplash.photos.likePhoto(id);
    },
    unlike(id) {
      return unsplash.photos.unlikePhoto(id);
    },
  },

  auth: {
    login(userPermissions) {
      return unsplash.auth.getAuthenticationUrl(userPermissions);
    },
    authenticate(token) {
      return unsplash.auth.userAuthentication(token);
    },
    setBearerToken(access_token) {
      unsplash.auth.setBearerToken(access_token);
    },
    getProfile() {
      return unsplash.currentUser.profile();
    },
  },
};
