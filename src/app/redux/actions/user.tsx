import { ADMIN_LOGIN_ACTION } from "../constant/user";

export function adminLogin(data: any) { 

  return {
    type: ADMIN_LOGIN_ACTION,
    payload: data,
  };
}
