
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userSettingsReducer } from './reducers/userSettingsReducer';

// Combine all reducers
const rootReducer = combineReducers({
  userSettings: userSettingsReducer,
});

// Create store with thunk middleware for async actions
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
