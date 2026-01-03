import { ADMIN_LOGIN_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  adminData: {},
  errorData: {},
  isAuth: false,
};


export const userReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case API_CALLING:
      return {
        ...state,
        isLoading: true,
      };


 case ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        adminData: action.response,
        isAuth: true,
      };
    }

    default:
      return state;
  }
};
