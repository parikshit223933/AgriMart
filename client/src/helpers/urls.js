let API_ROOT='http://localhost:8000/api/v1'

export const API_URLS={
    login:()=>`${API_ROOT}/users/create-session`,
    signUp:()=>`${API_ROOT}/users/create`,
    createProduct:()=>`${API_ROOT}/product/create`,
}