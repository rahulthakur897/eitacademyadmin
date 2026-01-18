import { ADD_COURSE_SUCCESS, DELETE_COURSE_SUCCESS, FETCH_COURSES_SUCCESS } from "../constant";
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

      return {
        ...state,
        courseList: action.response,
      };
    };
  case ADD_COURSE_SUCCESS: {
      return {
        ...state,
        courseList: [ action.response, ...state.courseList],
      };
    }
    //  case UPDATE_CATEGORY_SUCCESS: {
    //   const updatedList = state.categoryData.map((list) =>
    //             list?.id === action.response?.id ? action.response : list
    //   );
    //   return {
    //     ...state,
    //     categoryData: updatedList,
    //   };
    // }
 case DELETE_COURSE_SUCCESS: {
      const updatedList = state.courseList.filter((list) =>
                list?.id !== action.response       );
      return {
        ...state,
        courseList: updatedList,
      };
    }
    default:
      return state;
  }
};
