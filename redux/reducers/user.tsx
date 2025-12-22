import { API_CALLING } from "../constant/common";

const initialState = {
  bookList: [],

};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case API_CALLING:
      return {
        ...state,
        isLoading: true,
      };


  
    default:
      return state;
  }
};
