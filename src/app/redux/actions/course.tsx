import { FETCH_COURSES } from "../constant";

export function fetchCourses() { 
  return {
    type: FETCH_COURSES,
  };
}
