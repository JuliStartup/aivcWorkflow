import { CREATE_NOTE, FETCH_ALL_NOTE } from '../constants/actionTypes';

export default (action, note = []) => {
  switch (action?.type) {
    case FETCH_ALL_NOTE:
      return action.payload;
    case CREATE_NOTE:
      return action.payload;
    default:
      return note;
  }
};
