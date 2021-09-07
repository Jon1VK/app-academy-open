import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';

const addLoggingToDispatch = (store) => (next) => (action) => {
  console.log('Previous state: ', store.getState());
  console.log('Action: ', action);
  const result = next(action);
  console.log('New state: ', store.getState());
  return result;
};

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(addLoggingToDispatch)
  );
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });
  return store;
};

export default configureStore;
