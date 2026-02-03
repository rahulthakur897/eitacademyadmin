import { ADD_COURSE_SUCCESS, DELETE_COURSE_SUCCESS, FETCH_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS, FETCH_UPCOMING_COURSE_SUCCESS, ADD_UPCOMING_COURSE_SUCCESS, UPDATE_UPCOMING_COURSE_SUCCESS, DELETE_UPCOMING_COURSE_SUCCESS, FETCH_POPULAR_COURSE_SUCCESS, ADD_POPULAR_COURSE_SUCCESS, DELETE_POPULAR_COURSE_SUCCESS } from "../constant";
import { API_CALLING } from "../constant/common";

const initialState = {
  loading: false,
  courseList: [],
  upcomingCourseList: [],
  popularCourseList: [],
  errorData: {},
};


export const courseReducer = (state = initialState, action: any) => {
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
        courseList: [action.response, ...state.courseList],
      };
    }
    case UPDATE_COURSE_SUCCESS: {
      const updatedList = state.courseList.map((list) =>
        list?.id === action.response?.id ? action.response : list
      );
      return {
        ...state,
        courseList: updatedList,
      };
    }
    case DELETE_COURSE_SUCCESS: {
      const updatedList = state.courseList.filter((list) =>
        list?.id !== action.response);
      return {
        ...state,
        courseList: updatedList,
      };
    }
    case FETCH_UPCOMING_COURSE_SUCCESS: {
      return {
        ...state,
        upcomingCourseList: action.response,
      };
    };
    case ADD_UPCOMING_COURSE_SUCCESS:{
      return {
        ...state,
        upcomingCourseList: [action.response, ...state.upcomingCourseList],
      };
    }
      case UPDATE_UPCOMING_COURSE_SUCCESS:{
        const updatedList = state.upcomingCourseList.map((list) =>
        list?.id === action.response?.id ? action.response : list
      );
      return {
        ...state,
        upcomingCourseList: updatedList,
      };
    }
      case DELETE_UPCOMING_COURSE_SUCCESS: {
      const updatedList = state.upcomingCourseList.filter((list) =>
        list?.id !== action.response);
      return {
        ...state,
        upcomingCourseList: updatedList,
      };
    }
     case FETCH_POPULAR_COURSE_SUCCESS: {
      return {
        ...state,
        popularCourseList: action.response,
      };
    };
    case ADD_POPULAR_COURSE_SUCCESS:{
      return {
        ...state,
        popularCourseList: [action.response, ...state.popularCourseList],
      };
    }
      case DELETE_POPULAR_COURSE_SUCCESS: {
      const updatedList = state.popularCourseList.filter((list) =>
        list?.id !== action.response);
      return {
        ...state,
        popularCourseList: updatedList,
      };
    }
    default:
      return state;
  }
};
