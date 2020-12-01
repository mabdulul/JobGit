import { useReducer } from "react";

const initalState = {
	loading: true,
	loadingMore: false,
	jobs: [],
	error: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_CLEAR":
			return {
				loading: true,
				jobs: [],
				error: " ",
			};
		case "FETCH_LOADING":
			return {
				loading: true,
				jobs: [],
			};
		case "FETCH_SUCCESS":
			return {
				loading: false,
				jobs: action.payload,
				error: "",
			};
		case "FETCH_ERROR":
			return {
				loading: false,
				jobs: [],
				error: true,
			};
		case "FETCH_LOAD_MORE_LOADING":
			return {
				loadingMore: true,
				jobs: [...state.jobs],
			};
		case "FETCH_LOADMORE":
			return {
				loadingMore: false,
				jobs: [...state.jobs, ...action.payload],
			};
		default:
			return state;
	}
};

export default function useFetchJobs() {
	return useReducer(reducer, initalState);
}
