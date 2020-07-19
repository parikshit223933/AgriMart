import { API_URLS } from "../helpers/urls";
import { getAuthTokenFromStorage, getFormBody } from "../helpers/utils";
import { CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, RETRIEVE_PRODUCTS_START, RETRIEVE_PRODUCTS_SUCCESS, RETRIEVE_PRODUCTS_FAILURE, FETCH_BOUGHT_PRODUCTS_START, FETCH_BOUGHT_PRODUCTS_SUCCESS, FETCH_BOUGHT_PRODUCTS_FAILURE, EDIT_PRODUCT_START, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILURE, DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, GET_SINGLE_PRODUCT_START, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE } from "./actionTypes";

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

/* fetch all the products the current user has bought */
export function fetchBoughtProductsStart()
{
    return{
        type:FETCH_BOUGHT_PRODUCTS_START
    }
}
export function fetchBoughtProductsSuccess(products)
{
    return{
        type:FETCH_BOUGHT_PRODUCTS_SUCCESS,
        products
    }
}
export function fetchBoughtProductsFailure(error)
{
    return{
        type:FETCH_BOUGHT_PRODUCTS_FAILURE,
        error
    }
}
export function fetchBoughtProducts(userId)
{
    return(dispatch)=>
    {
        dispatch(fetchBoughtProductsStart());
        let url=API_URLS.getBoughtProducts();
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
                    dispatch(fetchBoughtProductsSuccess(data.data.products));
                    return;
                }
                else
                {
                    dispatch(fetchBoughtProductsFailure(data.message));
                }
            })
    }
}

/* EDIT A PRODUCT */
export function editProductStart()
{
    return{
        type:EDIT_PRODUCT_START
    }
}
export function editProductSuccess(product)
{
    return{
        type:EDIT_PRODUCT_SUCCESS,
        product
    }
}
export function editProductFailure(error)
{
    return{
        type:EDIT_PRODUCT_FAILURE,
        error
    }
}
export function editProduct(formData)
{
    return (dispatch)=>
    {
        dispatch(editProductStart());
        let url=API_URLS.editProduct();

        fetch(url, {
            method:'POST',
            headers:{
                Authorization:`Bearer ${getAuthTokenFromStorage()}`
            },//not mentioning content type because it is multipart data (it will be set up automatically by the browser!)
            body:formData
        })
        .then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {
                    dispatch(editProductSuccess(data.data.product));
                    return;
                }
                dispatch(editProductFailure(data.message));
            });
    }
}

/* DELETING A PRODUCT */
export function deleteProductStart()
{
    return{
        type:DELETE_PRODUCT_START
    }
}
export function deleteProductSuccess(productId)
{
    return{
        type:DELETE_PRODUCT_SUCCESS,
        productId
    }
}
export function deleteProductFailure(error)
{
    return{
        type:DELETE_PRODUCT_FAILURE,
        error
    }
}
export function deleteProduct(productId, userId)
{
    return (dispatch)=>
    {
        dispatch(deleteProductStart());
        let url=API_URLS.deleteProduct();
        fetch(url, {
            method:'POST',
            headers:{
                Authorization:`Bearer ${getAuthTokenFromStorage()}`,
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({productId, userId})
        })
        .then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {
                    dispatch(deleteProductSuccess(productId));
                }
                else
                {
                    dispatch(deleteProductFailure(data.message));
                }
            })
    }
}

/* get single product */
export function getSingleProductStart()
{
    return{
        type:GET_SINGLE_PRODUCT_START
    }
}
export function getSingleProductSuccess(product)
{
    return{
        type:GET_SINGLE_PRODUCT_SUCCESS,
        product
    }
}
export function getSingleProductFailure(error)
{
    return{
        type:GET_SINGLE_PRODUCT_FAILURE,
        error
    }
}
export function getSingleProduct(productId)
{
    return(dispatch)=>
    {
        dispatch(getSingleProductStart());
        let url=API_URLS.getSingleProduct();

        fetch(url, {
            method:'POST',
            headers:{
                Authorization:`Bearer ${getAuthTokenFromStorage()}`,
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({productId})
        })
        .then(response=>response.json())
        .then(data=>
            {
                if(data.success)
                {   
                    dispatch(getSingleProductSuccess(data.data.product));
                    return;
                }else
                {
                    dispatch(getSingleProductFailure(data.message));
                }
            });
    }
}