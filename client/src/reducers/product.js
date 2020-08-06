import
{
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
    DELETE_PRODUCT_FROM_CART_FAILURE,
    CLEAR_PRODUCT_STATE,
    UPVOTE_START,
    UPVOTE_SUCCESS,
    UPVOTE_FAILURE,
    DOWNVOTE_START,
    DOWNVOTE_SUCCESS,
    DOWNVOTE_FAILURE
} from "../actions/actionTypes";

let initialProductState = {
    allProducts: [],
    inProgress: null,
    error: null,
    success: null,
    boughtProducts: [],
    singleProduct: null,
    categorizedProducts: [],
    homeProducts: {},
    cart: []
};
export default function product(state = initialProductState, action)
{
    switch (action.type)
    {
        case CREATE_PRODUCT_START:
            return {
                ...state,
                inProgress: true,
                error: false
            };
        case CREATE_PRODUCT_SUCCESS://Success Notification Needed
            return {
                ...state,
                inProgress: false,
                error: false,
                allProducts: [action.product, ...state.allProducts],
                success: 'Product Created Successfully!'
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
        case EDIT_PRODUCT_SUCCESS://Success Notification Needed
            let newProducts = state.allProducts.filter(function (product)
            {
                return product._id === action.product._id;
            });
            return {
                ...state,
                inProgress: false,
                error: false,
                allProducts: newProducts,
                success: 'Product Edited Successfully!'
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
        case DELETE_PRODUCT_SUCCESS://Success Notification Needed
            let new_Products = state.allProducts.filter(function (product)
            {
                return product._id !== action.productId;
            });
            return {
                ...state,
                inProgress: false,
                error: false,
                allProducts: new_Products,
                success: 'Product Deleted Successfully!'
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
        case CREATE_REVIEW_SUCCESS://Success Notification Needed
            return {
                ...state,
                inProgress: false,
                singleProduct: action.product,
                error: false,
                success: 'Posted New Review!'
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
        case DELETE_REVIEW_SUCCESS://Success Notification Needed
            let newAllProductsArray = state.allProducts.map((product) =>
            {
                if (product._id === action.productId)
                {
                    return action.product;
                }
                return product;
            });
            return {
                ...state,
                inProgress: false,
                error: false,
                allProducts: newAllProductsArray,
                singleProduct: action.product,
                success: 'Review Deleted Successfully!'
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
        case UPDATE_REVIEW_SUCCESS://Success Notification Needed
            let newAllProducts = state.allProducts.map((product) =>
            {
                if (product._id === action.productId)
                {
                    return action.product;
                }
                return product;
            });
            return {
                ...state,
                inProgress: false,
                singleProduct: action.product,
                allProducts: newAllProducts,
                error: false,
                success: 'Review updated Successfully!'
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
        case TOGGLE_LIKE_SUCCESS://Success Notification Needed
            if (action.status)
            {
                return {
                    ...state,
                    inProgress: false,
                    error: false,
                    singleProduct: action.product,
                    success: 'Like Added Successfully!'
                };
            }
            else
                return {
                    ...state,
                    inProgress: false,
                    error: false,
                    singleProduct: action.product,
                    success: 'Like Removed Successfully!'
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
        case TOGGLE_DISLIKE_SUCCESS://Success Notification Needed
            if (action.status)
                return {
                    ...state,
                    inProgress: false,
                    error: false,
                    singleProduct: action.product,
                    success: 'Dislike Added Successfully!'
                };
            else
                return {
                    ...state,
                    inProgress: false,
                    error: false,
                    singleProduct: action.product,
                    success: 'Dislike Removed Successfully!'
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
        case ADD_TO_CART_SUCCESS://Success Notification Needed
            return {
                ...state,
                inProgress: false,
                cart: action.cart,
                error: false,
                success: 'Product is added to cart successfully!'
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
        case DECREASE_PRODUCT_QUANTITY_SUCCESS://Success Notification Needed
            if (action.deleted)
            {
                let filteredCart = state.cart.filter((item) =>
                {
                    if (action.productId === item.product._id)
                    {
                        return false;
                    }
                    return true;
                });
                return {
                    ...state,
                    inProgress: false,
                    cart: filteredCart,
                    error: false,
                    success: 'Product is removed from the cart!'
                };
            } else
            {
                let mappedCart = state.cart.map((item) =>
                {
                    if (item.product._id === action.productId)
                    {
                        item.quantity--;
                    }
                    return item;
                });
                return {
                    ...state,
                    inProgress: false,
                    cart: mappedCart,
                    error: false,
                    success: 'Product Quantity Reduced!'
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
        case DELETE_PRODUCT_FROM_CART_SUCCESS://Success Notification Needed
            let newCartItems = state.cart.filter(item =>
            {
                if (item.product._id === action.productId)
                {
                    return false;
                }
                return true;
            })
            return {
                ...state,
                inProgress: false,
                cart: newCartItems,
                error: false,
                success: 'Product is deleted from cart successfully!'
            };
        case DELETE_PRODUCT_FROM_CART_FAILURE:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case CLEAR_PRODUCT_STATE:
            return {
                ...state,
                error: null,
                success: null,
            }
        case UPVOTE_START:
            return{
                ...state,
                inProgress:true,
                error:false,
                success:null
            }
        case UPVOTE_SUCCESS:
            let newSingleProduct=Object.assign({}, state.singleProduct);
            newSingleProduct.seller.upVotes=action.upVotes;
            let new_AllProducts=state.allProducts.map(product=>
                {
                    if(product._id===newSingleProduct._id)
                    {
                        return newSingleProduct;
                    }
                    return product;
                });
            return{
                ...state,
                singleProduct:newSingleProduct,
                allProducts:new_AllProducts,
                inProgress:false,
                success:action.success
            }
        case UPVOTE_FAILURE:
            return {
                ...state,
                error:action.error,
                inProgress:false
            }
        case DOWNVOTE_START:
            return{
                ...state,
                inProgress:true,
                error:false,
                success:null
            }
        case DOWNVOTE_SUCCESS:
            let new_single_product=Object.assign({}, state.singleProduct);
            new_single_product.seller.upVotes=action.upVotes;
            let new_All_Products=state.allProducts.map(product=>
                {
                    if(product._id===new_single_product._id)
                    {
                        return new_single_product;
                    }
                    return product;
                });
            return{
                ...state,
                singleProduct:new_single_product,
                allProducts:new_All_Products,
                inProgress:false,
                success:action.success
            }
        case DOWNVOTE_FAILURE:
            return {
                ...state,
                error:action.error,
                inProgress:false
            }
        default:
            return state;
    }
}
