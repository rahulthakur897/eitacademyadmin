import { ADMIN_LOGIN_ACTION, GET_INSTRUCTOR_LIST } from "../constant/user";

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