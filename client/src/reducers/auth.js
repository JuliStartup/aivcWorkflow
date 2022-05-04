import { useNavigate } from 'react-router-dom';
import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (action, state = { authData: null }) => {
  switch (action?.type) {
    case AUTH:
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
