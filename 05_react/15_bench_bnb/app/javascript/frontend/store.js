import { configureStore } from '@reduxjs/toolkit';
import sessionReducer, { login } from './features/session/sessionSlice';
import usersReducer from './features/users/usersSlice';
import benchesReducer from './features/benches/benchesSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: usersReducer,
    benches: benchesReducer,
  },
});

const currentUserMetaTag = document.getElementsByName('current-user')[0];

if (currentUserMetaTag) {
  const currentUser = JSON.parse(currentUserMetaTag.content);
  store.dispatch(login.fulfilled(currentUser));
  currentUserMetaTag.remove();
}

export default store;
