import { ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, FETCH_CATEGORY_SUCCESS, UPDATE_CATEGORY_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  categoryData: [],
  errorData: {},
};


export const categoryReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case API_CALLING:
      return {
        ...state,
        isLoading: true,
      };


 case FETCH_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryData: action.response,
      };
    }
  case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        categoryData: [ action.response, ...state.categoryData],
      };
    }
     case UPDATE_CATEGORY_SUCCESS: {
      const updatedList = state.categoryData.map((list) =>
                list?.id === action.response?.id ? action.response : list
      );
      return {
        ...state,
        categoryData: updatedList,
      };
    }
 case DELETE_CATEGORY_SUCCESS: {
      const updatedList = state.categoryData.filter((list) =>
                list?.id !== action.response       );
      return {
        ...state,
        categoryData: updatedList,
      };
    }
    default:
      return state;
  }
};
