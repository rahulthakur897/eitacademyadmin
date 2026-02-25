import { ADMIN_LOGIN_ERROR, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_LOGOUT_SUCCESS, GET_INSTRUCTOR_LIST_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  isAdminLoggedIn: false,
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
const response = action.response;
      sessionStorage.setItem("isAdminLoggedIn", "true");
      sessionStorage.setItem("adminData", JSON.stringify(response[0]));
      return {
        ...state,
        isLoading: false,
        adminData: response || {},
        isAdminLoggedIn: true,
        errorMsg: "",
      };
    }
    case ADMIN_LOGIN_ERROR: {
      const { message } = action.response;
      return {
        ...state,
        isLoading: false,
        isAdminLoggedIn: false,
        errorMsg: message || "Login failed",
      };
    }
     case ADMIN_LOGOUT: {
      sessionStorage.clear();
      return {
        ...state,
        isLoading: false,
        isAdminLoggedIn: false,
        adminData: {},
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
