import { ADMIN_LOGIN_SUCCESS, GET_INSTRUCTOR_LIST_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  adminData: {},
  errorData: {},
  isAuth: false,
  instructorList: [],
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
    case GET_INSTRUCTOR_LIST_SUCCESS: {
      
      return {
        ...state,
        instructorList: action.response,
      };
    }
    default:
      return state;
  }
};
