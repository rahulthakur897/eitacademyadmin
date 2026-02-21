import { ADD_CATEGORY,DELETE_CATEGORY,FETCH_CATEGORY, UPDATE_CATEGORY } from "../constant";

export function fetchCategory() { 

  return {
    type: FETCH_CATEGORY,

  };
}

export function addCategory(addObject: any) { 
  return {
    type: ADD_CATEGORY,
    payload: addObject,
  };
}

export function updateCategory(updateObject: any) { 

  return {
    type: UPDATE_CATEGORY,
    payload: updateObject,
  };
}

export function deleteCategory(rowId: any) { 

  return {
    type: DELETE_CATEGORY,
    payload: rowId,
  };
}

