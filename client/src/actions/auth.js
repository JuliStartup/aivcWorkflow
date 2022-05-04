import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index';
import { useNavigate } from 'react-router-dom';

export const signIn = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData).catch((err) => {
      console.error(err);
    });
    if (data) {
      dispatch({ type: 'AUTH', data });
    }
  } catch (error) {
    console.log(error);
  }
};
export const signUp = (formData, history) => async (dispatch) => {
  try {
    // sign up  the user
    const { data } = await api.signUp(formData).catch((err) => {
      console.error(err);
    });
    if (data) {
      dispatch({ type: 'AUTH', data });
      history('/');
    }
  } catch (error) {
    console.log(error);
  }
};
