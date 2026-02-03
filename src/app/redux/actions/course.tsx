import { 
  FETCH_COURSES, 
  ADD_COURSE, 
  DELETE_COURSE, 
  UPDATE_COURSE, 
  FETCH_UPCOMING_COURSE, 
  ADD_UPCOMING_COURSE, 
  UPDATE_UPCOMING_COURSE, 
  DELETE_UPCOMING_COURSE,
  FETCH_POPULAR_COURSE, 
  ADD_POPULAR_COURSE,
  DELETE_POPULAR_COURSE} from "../constant";

export function fetchCourses() {
  return {
    type: FETCH_COURSES,
  };
}

export function addCourse(formData: any) {
  return {
    type: ADD_COURSE,
    payload: formData
  };
}

export function deleteCourse(rowId: any) {
  return {
    type: DELETE_COURSE,
    payload: rowId
  };
}

export function updateCourse(formData: any) {
  return {
    type: UPDATE_COURSE,
    payload: formData
  };
}

export function fetchUpcomingCourse() {
  return {
    type: FETCH_UPCOMING_COURSE,
  };
}

export function addUpcomingCourse(formData: any) {
  return {
    type: ADD_UPCOMING_COURSE,
    payload: formData
  };
}
export function updateUpcomingCourse(formData: any) {
  return {
    type: UPDATE_UPCOMING_COURSE,
    payload: formData
  };
}

export function deleteUpcomingCourse(rowId: any) {
  return {
    type: DELETE_UPCOMING_COURSE,
    payload: rowId
  };
}

export function getPopularCourse() {
  return {
    type: FETCH_POPULAR_COURSE,
  };
}

export function addPopularCourse(formData: any) {
  return {
    type: ADD_POPULAR_COURSE,
    payload: formData
  };
}

export function deletePopularCourse(rowId: any) {
  return {
    type: DELETE_POPULAR_COURSE,
    payload: rowId
  };
}