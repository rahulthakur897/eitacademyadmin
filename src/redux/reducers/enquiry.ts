import { Blog } from "@/utils/type";
import { API_CALLING } from "../constant/common";
import { ADD_BLOG_SUCCESS, DELETE_BLOG_SUCCESS, UPDATE_BLOG_SUCCESS } from "../constant";
import { FETCH_ENQUIRY_SUCCESS } from "../constant/enquiry";

const initialState = {
    loading: false,
    enquiryList: [],
    errorData: {},
};

export const enquiryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case API_CALLING:
            return {
                ...state,
                isLoading: true,
            };

        case FETCH_ENQUIRY_SUCCESS: {
            return {
                ...state,
                enquiryList: Array.isArray(action.response)
                    ? action.response
                    : [],
            };
        }

        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                enquiryList: state.enquiryList.map((blog: Blog) =>
                    blog.id === action.response.id ? action.response : blog
                ),
            };

        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                enquiryList: state.enquiryList.filter(
                    (blog: Blog) => blog.id !== action.response
                ),
            };

        default:
            return state;
    }
};
