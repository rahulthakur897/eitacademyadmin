import { ADMIN_LOGIN_ACTION, ADMIN_LOGOUT, GET_INSTRUCTOR_LIST } from "../constant/user";

export function adminLogin(data: any) { 

  return {
    type: ADMIN_LOGIN_ACTION,
    payload: data,
  };
}

export function getInstructorList(){
  
  return{
    type: GET_INSTRUCTOR_LIST,
  }
}

export function doLogout() {
  return {
    type: ADMIN_LOGOUT
  };
}
