import {
	CREATE_PRODUCT_START,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
    RETRIEVE_PRODUCTS_START,
    RETRIEVE_PRODUCTS_SUCCESS,
    RETRIEVE_PRODUCTS_FAILURE,
    FETCH_BOUGHT_PRODUCTS_START,
    FETCH_BOUGHT_PRODUCTS_SUCCESS,
    FETCH_BOUGHT_PRODUCTS_FAILURE
} from "../actions/actionTypes";

let initialProductState = {
	allProducts: [],
	inProgress: null,
    error: null,
    boughtProducts:[]
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
        case RETRIEVE_PRODUCTS_START:
            return{
                ...state,
                inProgress:true,
                error:false
            }
        case RETRIEVE_PRODUCTS_SUCCESS:
            return{
                ...state,
                inProgress:false,
                error:false,
                allProducts:[...action.products]
            }
        case RETRIEVE_PRODUCTS_FAILURE:
            return{
                ...state,
                inProgress:false,
                error:action.error,
            }
        case FETCH_BOUGHT_PRODUCTS_START:
            return{
                ...state,
                inProgress:true
            }
        case FETCH_BOUGHT_PRODUCTS_SUCCESS:
            return{
                ...state,
                inProgress:false,
                error:false,
                boughtProducts:[...action.products]
            }
        case FETCH_BOUGHT_PRODUCTS_FAILURE:
            return{
                ...state,
                error:action.error,
                inProgress:false,
            }
		default:
			return state;
	}
}
