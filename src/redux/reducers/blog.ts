import { Blog } from "@/utils/type";
import { API_CALLING } from "../constant/common";
import { ADD_BLOG_SUCCESS, DELETE_BLOG_SUCCESS, FETCH_BLOG_SUCCESS, UPDATE_BLOG_SUCCESS } from "../constant";

const initialState = {
    loading: false,
    blogList: [],
    errorData: {},
};

export const blogReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case API_CALLING:
            return {
                ...state,
                isLoading: true,
            };

        case FETCH_BLOG_SUCCESS: {
            return {
                ...state,
                blogList: Array.isArray(action.response)
                    ? action.response
                    : [],
            };
        }

        case ADD_BLOG_SUCCESS:
            return {
                ...state,
                blogList: [action.response, ...(state.blogList || [])],
            };

        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                blogList: state.blogList.map((blog: Blog) =>
                    blog.id === action.response.id ? action.response : blog
                ),
            };

        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogList: state.blogList.filter(
                    (blog: Blog) => blog.id !== action.response
                ),
            };

        default:
            return state;
    }
};
