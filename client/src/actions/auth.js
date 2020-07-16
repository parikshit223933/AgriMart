import {
	LOGIN_START,
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	AUTHENTICATE_USER,
	LOG_OUT,
	CLEAR_AUTH_STATE,
	SIGN_UP_START,
	SIGN_UP_FAILURE,
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	UPLOAD_AVATAR_START,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE
} from "./actionTypes";
import { API_URLS } from "../helpers/urls";
import { getFormBody, getAuthTokenFromStorage } from "../helpers/utils";
const axios = require("axios");

/* logging in the existing user */
export function startLogin() {
	return {
		type: LOGIN_START
	};
}
export function loginSuccess(user) {
	return {
		type: LOGIN_SUCCESS,
		user
	};
}
export function loginFailure(error) {
	return {
		type: LOGIN_FAILURE,
		error
	};
}

export function login(email, password) {
	return (dispatch) => {
		dispatch(startLogin());
		let url = API_URLS.login();
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ email, password })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem("token", data.data.token);
					dispatch(loginSuccess(data.data.user));
					return;
				}
				dispatch(loginFailure(data.message));
			});
	};
}

/* authenticating the user on page refresh from the token in the local storage */

export function authenticateUser(user) {
	return {
		type: AUTHENTICATE_USER,
		user
	};
}

/* Logging out the user */
export function logoutUser() {
	return {
		type: LOG_OUT
	};
}
export function logout() {
	return (dispatch) => {
		dispatch(logoutUser());
		localStorage.removeItem("token");
	};
}

/* For clearing the auth state so that the error message is set to null when the component is unmounted and error is not shown after re-rendering the page. */
export function clearAuthState() {
	return {
		type: CLEAR_AUTH_STATE
	};
}

/* signing up the user */
export function signUpStart() {
	return {
		type: SIGN_UP_START
	};
}
//i have not created a sign up success function because if the user sign up is successful then the login action will be called automatically.
//see down below in the signUp function where if the sign up is successful, then the login function is called.
export function signUpFailure(error) {
	return {
		type: SIGN_UP_FAILURE,
		error
	};
}
export function signUp(name, email, password, confirm_password) {
	return (dispatch) => {
		dispatch(signUpStart());
		let url = API_URLS.signUp();
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: getFormBody({ name, email, password, confirm_password })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					dispatch(login(email, password));
					return;
				}
				dispatch(signUpFailure(data.message));
			});
	};
}

/* FOR UPDATING THE USER */
export function updateUserStart() {
	return {
		type: UPDATE_USER_START
	};
}
export function updateUserSuccess(user) {
	return {
		type: UPDATE_USER_SUCCESS,
		user
	};
}
export function updateUserFailure(error) {
	return {
		type: UPDATE_USER_FAILED,
		error
	};
}
export function updateUser(user, userId) {
	return (dispatch) => {
		let url = API_URLS.updateUser();
		dispatch(updateUserStart());
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${getAuthTokenFromStorage()}`
			},
			body: getFormBody({ ...user, _id: userId })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem("token", data.data.token);
					dispatch(updateUserSuccess(data.data.user));
					return;
				}
				dispatch(updateUserFailure(data.message));
			});
	};
}

export function uploadAvatarStart() {
	return {
		type: UPLOAD_AVATAR_START
	};
}
export function uploadAvatarSuccess(user) {
	return {
		type: UPLOAD_AVATAR_SUCCESS,
		user
	};
}
export function uploadAvatarFailure(error) {
	return {
		type: UPLOAD_AVATAR_FAILURE,
		error
	};
}
export function uploadAvatar(data) {
	return (dispatch) => {
		dispatch(uploadAvatarStart());
		let url = API_URLS.uploadAvatar();

		axios
			.post(url, data, {headers:{Authorization:`Bearer ${getAuthTokenFromStorage()}`}})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};
}
