import { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS } from "./actionTypes";
import { API_URLS } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function startLogin() {
	return {
		type: LOGIN_START
	};
}
export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS
	};
}
export function loginFailure() {
	return {
		type: LOGIN_FAILURE
	};
}

export function login(email, password) {
	return (dispatch) => {
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
				console.log(data);
			});
	};
}
