import { FETCH_COUNT } from '../constants/actionTypes';

export default (action, status = []) => {
  switch (action?.type) {
    case FETCH_COUNT:
      return action.payload;
    default:
      return status;
  }
};
