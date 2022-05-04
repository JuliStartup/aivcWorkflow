import { CREATE_NOTE, FETCH_ALL_NOTE } from '../constants/actionTypes';

import * as api from '../api/index';

export const getNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();

    dispatch({ type: FETCH_ALL_NOTE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createFollowUp = (note) => async (dispatch) => {
  try {
    const { data } = await api.createFollowUp(note);

    dispatch({ type: CREATE_NOTE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
