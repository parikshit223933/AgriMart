import { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_STATE } from "./actionTypes";
import { API_URLS } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

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
                if(data.success)
                {
                    localStorage.setItem('token', data.data.token);
                    dispatch(loginSuccess(data.data.user));
                    return;
                }
                dispatch(loginFailure(data.message));
			});
	};
}

/* authenticating the user on page refresh from the token in the local storage */

export function  authenticateUser(user)
{
    return{
        type:AUTHENTICATE_USER,
        user
    }
}

/* Logging out the user */
export function logoutUser()
{
    return{
        type:LOG_OUT
    }
}
export function logout()
{
    return (dispatch)=>
    {
        dispatch(logoutUser())
        localStorage.removeItem('token');
    }
}
export function clearAuthState()
{
    return {
        type:CLEAR_AUTH_STATE
    }
}