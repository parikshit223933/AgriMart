import {
	CREATE_PRODUCT_START,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE
} from "../actions/actionTypes";

let initialProductState = {
	allProducts: [],
	inProgress: null,
	error: null
};
export default function product(state = initialProductState, action) {
	switch (action.type) {
		case CREATE_PRODUCT_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case CREATE_PRODUCT_SUCCESS:
			return {
				...state,
				inProgress: false,
				error: false,
				allProducts: [action.product, ...state.allProducts]
			};
		case CREATE_PRODUCT_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		default:
			return state;
	}
}
