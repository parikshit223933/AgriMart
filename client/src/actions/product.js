import { API_URLS } from "../helpers/urls";
import { getAuthTokenFromStorage, getFormBody } from "../helpers/utils";
import { CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, RETRIEVE_PRODUCTS_START, RETRIEVE_PRODUCTS_SUCCESS, RETRIEVE_PRODUCTS_FAILURE } from "./actionTypes";

export function createProductStart()
{
    return {
        type:CREATE_PRODUCT_START
    }
}

export function createProductSuccess(product)
{
    return {
        type:CREATE_PRODUCT_SUCCESS,
        product
    }
}

export function createProductFailure(error)
{
    return {
        type:CREATE_PRODUCT_FAILURE,
        error
    }
}

export function createProduct(data)
{
    return (dispatch)=>
    {
        dispatch(createProductStart());
        let url=API_URLS.createProduct();
        fetch(url, {
            method:'POST',
            headers:{
                Authorization:`Bearer ${getAuthTokenFromStorage()}`
            },//not mentioning content type because it is multipart data (it will be set up automatically by the browser!)
            body:data
        })
        .then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {
                    dispatch(createProductSuccess(data.data.product));
                    return;
                }
                dispatch(createProductFailure(data.message));
            })
    }
}

/* Retrieving all products by current user! */
export function retrieveProductsStart()
{
    return {
        type:RETRIEVE_PRODUCTS_START
    }
}
export function retrieveProductsSuccess(products)
{
    return {
        type:RETRIEVE_PRODUCTS_SUCCESS,
        products
    }
}
export function retrieveProductsFailure(error)
{
    return{
        type:RETRIEVE_PRODUCTS_FAILURE,
        error
    }
}
export function retrieveProducts(userId)
{
    return (dispatch)=>
    {
        dispatch(retrieveProductsStart());
        let url=API_URLS.getProducts();
        fetch(url, {
            method:'POST',
            headers:{
                Authorization:`Bearer ${getAuthTokenFromStorage()}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:getFormBody({_id:userId})
        }).then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {
                    dispatch(retrieveProductsSuccess(data.data.products));
                    return;
                }
                else
                {
                    dispatch(retrieveProductsFailure(data.message));
                }
            })
    }
}