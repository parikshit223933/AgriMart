import {
	CREATE_PRODUCT_START,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
	RETRIEVE_PRODUCTS_START,
	RETRIEVE_PRODUCTS_SUCCESS,
	RETRIEVE_PRODUCTS_FAILURE,
	FETCH_BOUGHT_PRODUCTS_START,
	FETCH_BOUGHT_PRODUCTS_SUCCESS,
	FETCH_BOUGHT_PRODUCTS_FAILURE,
	EDIT_PRODUCT_START,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAILURE,
	DELETE_PRODUCT_START,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILURE,
	GET_SINGLE_PRODUCT_START,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_FAILURE,
	CREATE_REVIEW_START,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
	DELETE_REVIEW_START,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	UPDATE_REVIEW_SUCCESS,
	UPDATE_REVIEW_START,
	UPDATE_REVIEW_FAILURE,
	TOGGLE_LIKE_START,
	TOGGLE_LIKE_SUCCESS,
	TOGGLE_LIKE_FAILURE,
	TOGGLE_DISLIKE_START,
	TOGGLE_DISLIKE_SUCCESS,
	TOGGLE_DISLIKE_FAILURE,
	FETCH_CATEGORIZED_PRODUCTS_START,
	FETCH_CATEGORIZED_PRODUCTS_SUCCESS,
	FETCH_CATEGORIZED_PRODUCTS_FAILURE,
	GET_HOME_PRODUCTS_START,
	GET_HOME_PRODUCTS_SUCCESS,
	GET_HOME_PRODUCTS_FAILURE,
	ADD_TO_CART_START,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_FAILURE,
	GET_CART_ITEMS_START,
	GET_CART_ITEMS_SUCCESS,
	GET_CART_ITEMS_FAILURE,
	DECREASE_PRODUCT_QUANTITY_START,
	DECREASE_PRODUCT_QUANTITY_SUCCESS,
	DECREASE_PRODUCT_QUANTITY_FAILURE,
    DELETE_PRODUCT_FROM_CART_START,
    DELETE_PRODUCT_FROM_CART_SUCCESS,
    DELETE_PRODUCT_FROM_CART_FAILURE
} from "../actions/actionTypes";

let initialProductState = {
	allProducts: [],
	inProgress: null,
	error: null,
	boughtProducts: [],
	singleProduct: null,
	categorizedProducts: [],
	homeProducts: {},
	cart: []
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
			return {
				...state,
				inProgress: true,
				error: false
			};
		case RETRIEVE_PRODUCTS_SUCCESS:
			return {
				...state,
				inProgress: false,
				error: false,
				allProducts: [...action.products]
			};
		case RETRIEVE_PRODUCTS_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case FETCH_BOUGHT_PRODUCTS_START:
			return {
				...state,
				inProgress: true
			};
		case FETCH_BOUGHT_PRODUCTS_SUCCESS:
			return {
				...state,
				inProgress: false,
				error: false,
				boughtProducts: [...action.products]
			};
		case FETCH_BOUGHT_PRODUCTS_FAILURE:
			return {
				...state,
				error: action.error,
				inProgress: false
			};
		case EDIT_PRODUCT_START:
			return {
				...state,
				inProgress: true
			};
		case EDIT_PRODUCT_SUCCESS:
			let newProducts = state.allProducts.filter(function (product) {
				return product._id === action.product._id;
			});
			return {
				...state,
				inProgress: false,
				error: false,
				allProducts: newProducts
			};
		case EDIT_PRODUCT_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case DELETE_PRODUCT_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case DELETE_PRODUCT_SUCCESS:
			let new_Products = state.allProducts.filter(function (product) {
				return product._id !== action.productId;
			});
			return {
				...state,
				inProgress: false,
				error: false,
				allProducts: new_Products
			};
		case DELETE_PRODUCT_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case GET_SINGLE_PRODUCT_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case GET_SINGLE_PRODUCT_SUCCESS:
			return {
				...state,
				singleProduct: action.product,
				inProgress: false,
				error: false
			};
		case GET_SINGLE_PRODUCT_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case CREATE_REVIEW_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case CREATE_REVIEW_SUCCESS:
			return {
				...state,
				inProgress: false,
				singleProduct: action.product,
				error: false
			};
		case CREATE_REVIEW_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case DELETE_REVIEW_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case DELETE_REVIEW_SUCCESS:
			let newAllProductsArray = state.allProducts.map((product) => {
				if (product._id === action.productId) {
					return action.product;
				}
				return product;
			});
			return {
				...state,
				inProgress: false,
				error: false,
				allProducts: newAllProductsArray,
				singleProduct: action.product
			};
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
				error: action.error,
				inProgress: false
			};
		case UPDATE_REVIEW_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case UPDATE_REVIEW_SUCCESS:
			let newAllProducts = state.allProducts.map((product) => {
				if (product._id === action.productId) {
					return action.product;
				}
				return product;
			});
			return {
				...state,
				inProgress: false,
				singleProduct: action.product,
				allProducts: newAllProducts,
				error: false
			};
		case UPDATE_REVIEW_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case TOGGLE_LIKE_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case TOGGLE_LIKE_SUCCESS:
			return {
				...state,
				inProgress: false,
				error: false,
				singleProduct: action.product
			};
		case TOGGLE_LIKE_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case TOGGLE_DISLIKE_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case TOGGLE_DISLIKE_SUCCESS:
			return {
				...state,
				inProgress: false,
				error: false,
				singleProduct: action.product
			};
		case TOGGLE_DISLIKE_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case FETCH_CATEGORIZED_PRODUCTS_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case FETCH_CATEGORIZED_PRODUCTS_SUCCESS:
			return {
				...state,
				inProgress: false,
				categorizedProducts: action.products
			};
		case FETCH_CATEGORIZED_PRODUCTS_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case GET_HOME_PRODUCTS_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case GET_HOME_PRODUCTS_SUCCESS:
			return {
				...state,
				inProgress: false,
				homeProducts: action.products,
				error: false
			};
		case GET_HOME_PRODUCTS_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case ADD_TO_CART_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case ADD_TO_CART_SUCCESS:
			return {
				...state,
				inProgress: false,
				cart: action.cart,
				error: false
			};
		case ADD_TO_CART_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case GET_CART_ITEMS_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case GET_CART_ITEMS_SUCCESS:
			return {
				...state,
				inProgress: false,
				cart: action.cart,
				error: false
			};
		case GET_CART_ITEMS_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
		case DECREASE_PRODUCT_QUANTITY_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
		case DECREASE_PRODUCT_QUANTITY_SUCCESS:
			if (action.deleted) {
				let filteredCart = state.cart.filter((item) => {
					if (action.productId === item.product._id) {
						return false;
					}
					return true;
				});
				return {
					...state,
					inProgress: false,
					cart: filteredCart,
					error: false
				};
			} else {
				let mappedCart = state.cart.map((item) => {
					if (item.product._id === action.productId) {
						item.quantity--;
					}
					return item;
				});
				return {
					...state,
					inProgress: false,
					cart: mappedCart,
					error: false
				};
			}
		case DECREASE_PRODUCT_QUANTITY_FAILURE:
			return {
				...state,
				inProgress: false,
				error: action.error
			};
        case DELETE_PRODUCT_FROM_CART_START:
            return {
				...state,
				inProgress: true,
				error: false
			};
        case DELETE_PRODUCT_FROM_CART_SUCCESS:
            let newCartItems=state.cart.filter(item=>
                {
                    if(item.product._id===action.productId)
                    {
                        return false;
                    }
                    return true;
                })
                return {
					...state,
					inProgress: false,
					cart: newCartItems,
					error: false
				};
        case DELETE_PRODUCT_FROM_CART_FAILURE:
            return {
				...state,
				inProgress: false,
				error: action.error
			};

		default:
			return state;
	}
}
