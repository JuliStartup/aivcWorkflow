import { FETCH_CATEGORY_COUNT } from '../constants/actionTypes';

export default (action, category = []) => {
  switch (action?.type) {
    case FETCH_CATEGORY_COUNT:
      return action.payload;
    default:
      return category;
  }
};
