
import { v4 as uuid } from 'uuid';

export const defaultUser = {
  id: uuid(),
  username: 'username',
  name: 'name',
  profile_image:
    'https://stepik.org/media/users/29243219/avatar.png?1560587353',
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: 'username',
    name: 'name',
    profile_image:
      'https://stepik.org/media/users/29243219/avatar.png?1560587353',
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    'https://miro.medium.com/max/2400/1*Rvs7u_g6dnDTRF-FMY4vsA.png',
  comments: [],
  created_at: '2020-02-28T03:08:14.522421+00:00',
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      'https://miro.medium.com/max/2400/1*Rvs7u_g6dnDTRF-FMY4vsA.png',
    comments: [],
    created_at: '2020-02-28T03:08:14.522421+00:00',
  };
}

export const defaultCurrentUser = {
  id: uuid(),
  username: 'me',
  name: 'myself',
  profile_image:
    'https://stepik.org/media/users/29243219/avatar.png?1560587353',
  website: 'https://react.com',
  email: 'me@gmail.com',
  bio: 'This is my bio',
  phone_number: '555-555-5555',
  posts: [],
  followers: [defaultUser],
  following: [defaultUser],
};
