import { FETCH_COURSES_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  courseList: [],
  errorData: {},
};


export const courseReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case API_CALLING:
      return {
        ...state,
        isLoading: true,
      };


 case FETCH_COURSES_SUCCESS: {
    console.log("action.response----",action.response)
      return {
        ...state,
        courseList: action.response,
      };
    }
//   case ADD_CATEGORY_SUCCESS: {
//       return {
//         ...state,
//         categoryData: [ action.response, ...state.categoryData],
//       };
//     }
//      case UPDATE_CATEGORY_SUCCESS: {
//       const updatedList = state.categoryData.map((list) =>
//                 list?.id === action.response?.id ? action.response : list
//       );
//       return {
//         ...state,
//         categoryData: updatedList,
//       };
//     }
//  case DELETE_CATEGORY_SUCCESS: {
//       const updatedList = state.categoryData.filter((list) =>
//                 list?.id !== action.response       );
//       return {
//         ...state,
//         categoryData: updatedList,
//       };
//     }
    default:
      return state;
  }
};
