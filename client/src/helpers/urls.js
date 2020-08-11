let API_ROOT = "http://localhost:8000/api/v1";
let SERVER_ROOT = "http://localhost:8000";
let PRODUCT_IMAGE_ROOT='http://localhost:8000/uploads/products/coverImage-';

export const API_URLS = {
	login: () => `${API_ROOT}/users/create-session`,
    signUp: () => `${API_ROOT}/users/create`,
    oauth:()=>`${API_ROOT}/users/OAuth2-Authenticate`,
	createProduct: () => `${API_ROOT}/product/create`,
	updateUser: () => `${API_ROOT}/users/update-user`,
	uploadAvatar: () => `${API_ROOT}/users/upload-avatar`,
	forgotPassword: () => `${API_ROOT}/users/forgot-password`,
	resetPassword: () => `${API_ROOT}/users/reset-password`,
    serverRoot: () => SERVER_ROOT,
    productImageRoot:()=>PRODUCT_IMAGE_ROOT,
	getProducts: () => `${API_ROOT}/product/get-products`,
	getBoughtProducts: () => `${API_ROOT}/product/get-bought-items`,
	editProduct: () => `${API_ROOT}/product/edit-product`,
	deleteProduct: () => `${API_ROOT}/product/delete-product`,
	getSingleProduct: () => `${API_ROOT}/product/get-single-product`,
	createReview: () => `${API_ROOT}/review/create-new-review`,
	deleteReview: () => `${API_ROOT}/review/delete-review`,
	updateReview: () => `${API_ROOT}/review/update-review`,
	toggleLike: () => `${API_ROOT}/review/toggle-like-review`,
	toggleDislike: () => `${API_ROOT}/review/toggle-dislike-review`,
	categorizedProducts: () => `${API_ROOT}/product/categorized-products`,
	getHomeProducts: () => `${API_ROOT}/product/get-random-products`,
	checkoutProduct: () => `${API_ROOT}/checkout/createPayment`,
	addProductToCart: () => `${API_ROOT}/cart/add-product-to-cart`,
	getCart: () => `${API_ROOT}/cart/get-all-products`,
	decreaseProductQuantity: () => `${API_ROOT}/cart/decrease-product-quantity`,
	deleteCartProduct: () => `${API_ROOT}/cart/delete-product-from-cart`,
	sendMessage: () => `${API_ROOT}/contact/contact-agrimart`,
	upvote: () => `${API_ROOT}/users/upvote`,
    downvote: () => `${API_ROOT}/users/downvote`,
    searchProducts:()=>`${API_ROOT}/product/search-products`,
    
};
