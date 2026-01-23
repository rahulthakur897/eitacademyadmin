import { FETCH_COURSES, ADD_COURSE, DELETE_COURSE} from "../constant";

export function fetchCourses() { 
  return {
    type: FETCH_COURSES,
  };
}

export function addCourse(formData : any) {
  return {
    type: ADD_COURSE,
    payload : formData
  };
}

export function deleteCourse(rowId : any) {
  return {
    type: DELETE_COURSE,
    payload : rowId
  };
}

