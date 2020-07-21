import { API_URLS } from "../helpers/urls";
import { getAuthTokenFromStorage, getFormBody } from "../helpers/utils";
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
	UPDATE_REVIEW_START,
	UPDATE_REVIEW_SUCCESS,
	UPDATE_REVIEW_FAILURE,
	TOGGLE_LIKE_START,
	TOGGLE_LIKE_SUCCESS,
	TOGGLE_LIKE_FAILURE,
	TOGGLE_DISLIKE_START,
	TOGGLE_DISLIKE_SUCCESS,
	TOGGLE_DISLIKE_FAILURE
} from "./actionTypes";

export function createProductStart() {
	return {
		type: CREATE_PRODUCT_START
	};
}

export function createProductSuccess(product) {
	return {
		type: CREATE_PRODUCT_SUCCESS,
		product
	};
}

export function createProductFailure(error) {
	return {
		type: CREATE_PRODUCT_FAILURE,
		error
	};
}

export function createProduct(data) {
	return (dispatch) => {
		dispatch(createProductStart());
		let url = API_URLS.createProduct();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`
			}, //not mentioning content type because it is multipart data (it will be set up automatically by the browser!)
			body: data
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(createProductSuccess(data.data.product));
					return;
				}
				dispatch(createProductFailure(data.message));
			});
	};
}

/* Retrieving all products by current user! */
export function retrieveProductsStart() {
	return {
		type: RETRIEVE_PRODUCTS_START
	};
}
export function retrieveProductsSuccess(products) {
	return {
		type: RETRIEVE_PRODUCTS_SUCCESS,
		products
	};
}
export function retrieveProductsFailure(error) {
	return {
		type: RETRIEVE_PRODUCTS_FAILURE,
		error
	};
}
export function retrieveProducts(userId) {
	return (dispatch) => {
		dispatch(retrieveProductsStart());
		let url = API_URLS.getProducts();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ _id: userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(retrieveProductsSuccess(data.data.products));
					return;
				} else {
					dispatch(retrieveProductsFailure(data.message));
				}
			});
	};
}

/* fetch all the products the current user has bought */
export function fetchBoughtProductsStart() {
	return {
		type: FETCH_BOUGHT_PRODUCTS_START
	};
}
export function fetchBoughtProductsSuccess(products) {
	return {
		type: FETCH_BOUGHT_PRODUCTS_SUCCESS,
		products
	};
}
export function fetchBoughtProductsFailure(error) {
	return {
		type: FETCH_BOUGHT_PRODUCTS_FAILURE,
		error
	};
}
export function fetchBoughtProducts(userId) {
	return (dispatch) => {
		dispatch(fetchBoughtProductsStart());
		let url = API_URLS.getBoughtProducts();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ _id: userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(fetchBoughtProductsSuccess(data.data.products));
					return;
				} else {
					dispatch(fetchBoughtProductsFailure(data.message));
				}
			});
	};
}

/* EDIT A PRODUCT */
export function editProductStart() {
	return {
		type: EDIT_PRODUCT_START
	};
}
export function editProductSuccess(product) {
	return {
		type: EDIT_PRODUCT_SUCCESS,
		product
	};
}
export function editProductFailure(error) {
	return {
		type: EDIT_PRODUCT_FAILURE,
		error
	};
}
export function editProduct(formData) {
	return (dispatch) => {
		dispatch(editProductStart());
		let url = API_URLS.editProduct();

		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`
			}, //not mentioning content type because it is multipart data (it will be set up automatically by the browser!)
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(editProductSuccess(data.data.product));
					return;
				}
				dispatch(editProductFailure(data.message));
			});
	};
}

/* DELETING A PRODUCT */
export function deleteProductStart() {
	return {
		type: DELETE_PRODUCT_START
	};
}
export function deleteProductSuccess(productId) {
	return {
		type: DELETE_PRODUCT_SUCCESS,
		productId
	};
}
export function deleteProductFailure(error) {
	return {
		type: DELETE_PRODUCT_FAILURE,
		error
	};
}
export function deleteProduct(productId, userId) {
	return (dispatch) => {
		dispatch(deleteProductStart());
		let url = API_URLS.deleteProduct();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ productId, userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(deleteProductSuccess(productId));
				} else {
					dispatch(deleteProductFailure(data.message));
				}
			});
	};
}

/* get single product */
export function getSingleProductStart() {
	return {
		type: GET_SINGLE_PRODUCT_START
	};
}
export function getSingleProductSuccess(product) {
	return {
		type: GET_SINGLE_PRODUCT_SUCCESS,
		product
	};
}
export function getSingleProductFailure(error) {
	return {
		type: GET_SINGLE_PRODUCT_FAILURE,
		error
	};
}
export function getSingleProduct(productId) {
	return (dispatch) => {
		dispatch(getSingleProductStart());
		let url = API_URLS.getSingleProduct();

		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ productId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(getSingleProductSuccess(data.data.product));
					return;
				} else {
					dispatch(getSingleProductFailure(data.message));
				}
			});
	};
}

/* create a new review */
export function createReviewStart() {
	return {
		type: CREATE_REVIEW_START
	};
}

export function createReviewSuccess(product) {
	return {
		type: CREATE_REVIEW_SUCCESS,
		product
	};
}

export function createReviewFailure(error) {
	return {
		type: CREATE_REVIEW_FAILURE,
		error
	};
}
export function createReview(review) {
	return (dispatch) => {
		dispatch(createReviewStart());
		let url = API_URLS.createReview();

		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ ...review })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(createReviewSuccess(data.data.product));
				} else {
					dispatch(createReviewFailure(data.message));
				}
			});
	};
}
export function deleteReviewStart() {
	return {
		type: DELETE_REVIEW_START
	};
}
export function deleteReviewSuccess(productId, reviewId, product) {
	return {
		type: DELETE_REVIEW_SUCCESS,
		productId,
		reviewId,
		product
	};
}
export function deleteReviewFailure(error) {
	return {
		type: DELETE_REVIEW_FAILURE,
		error
	};
}
export function deleteReview(productId, reviewId, userId) {
	return (dispatch) => {
		dispatch(deleteReviewStart());
		let url = API_URLS.deleteReview();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ productId, reviewId, userId })
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						deleteReviewSuccess(
							productId,
							reviewId,
							data.data.product
						)
					);
				} else {
					dispatch(deleteReviewFailure(data.message));
				}
			});
	};
}

/* for updating a review */
export function updateReviewStart() {
	return {
		type: UPDATE_REVIEW_START
	};
}
export function updateReviewSuccess(productId, reviewId, product) {
	return {
		type: UPDATE_REVIEW_SUCCESS,
		productId,
		reviewId,
		product
	};
}
export function updateReviewFailure(error) {
	return {
		type: UPDATE_REVIEW_FAILURE,
		error
	};
}
export function updateReview(reviewUpdates, userId, reviewId, productId) {
	return (dispatch) => {
		dispatch(updateReviewStart());
		let url = API_URLS.updateReview();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ ...reviewUpdates, userId, reviewId, productId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						updateReviewSuccess(
							productId,
							reviewId,
							data.data.product
						)
					);
				} else {
					dispatch(updateReviewFailure(data.message));
				}
			});
	};
}

/* for toggling a like */
export function toggleLikeStart() {
	return {
		type: TOGGLE_LIKE_START
	};
}
export function toggleLikeSuccess(product) {
	return {
		type: TOGGLE_LIKE_SUCCESS,
		product
	};
}
export function toggleLikeFailure(error) {
	return {
		type: TOGGLE_LIKE_FAILURE,
		error
	};
}
export function toggleLike(reviewId, userId) {
	return (dispatch) => {
		dispatch(toggleLikeStart());
		let url = API_URLS.toggleLike();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ reviewId, userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						toggleLikeSuccess(data.data.product, data.data.status)
					);
				} else {
					dispatch(toggleLikeFailure(data.message));
				}
			});
	};
}

/* for toggling a dislike */
/* for toggling a like */
export function toggleDislikeStart() {
	return {
		type: TOGGLE_DISLIKE_START
	};
}
export function toggleDislikeSuccess(product) {
	return {
		type: TOGGLE_DISLIKE_SUCCESS,
		product
	};
}
export function toggleDislikeFailure(error) {
	return {
		type: TOGGLE_DISLIKE_FAILURE,
		error
	};
}
export function toggleDislike(reviewId, userId) {
	return (dispatch) => {
		dispatch(toggleDislikeStart());
		let url = API_URLS.toggleDislike();
		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getAuthTokenFromStorage()}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ reviewId, userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						toggleDislikeSuccess(
							data.data.product,
							data.data.status
						)
					);
				} else {
					dispatch(toggleDislikeFailure(data.message));
				}
			});
	};
}
