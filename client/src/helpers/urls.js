let API_ROOT='http://localhost:8000/api/v1'
let USER_PROFILE_PICTURE_ROOT='http://localhost:8000'
export const API_URLS={
    login:()=>`${API_ROOT}/users/create-session`,
    signUp:()=>`${API_ROOT}/users/create`,
    createProduct:()=>`${API_ROOT}/product/create`,
    updateUser:()=>`${API_ROOT}/users/update-user`,
    uploadAvatar:()=>`${API_ROOT}/users/upload-avatar`,
    profilePictureRoot:()=>USER_PROFILE_PICTURE_ROOT,
    getProducts:()=>`${API_ROOT}/product/get-products`,
    getBoughtProducts:()=>`${API_ROOT}/product/get-bought-items`,
    editProduct:()=>`${API_ROOT}/product/edit-product`,
    deleteProduct:()=>`${API_ROOT}/product/delete-product`,
    getSingleProduct:()=>`${API_ROOT}/product/get-single-product`,

}