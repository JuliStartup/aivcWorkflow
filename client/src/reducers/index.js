import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import notes from './note';
import status from './status';
import category from './category';

export const reducers = combineReducers({
  posts,
  notes,
  status,
  category
});
