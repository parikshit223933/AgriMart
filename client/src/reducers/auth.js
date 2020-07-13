import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE
} from "../actions/actionTypes";

let initialAuthState = {
	user: {},
	error: "",
	inProgress: false,
	isLoggedIn: false
};
export default function auth(state = initialAuthState, action) {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				inProgress: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				error: null,
				isLoggedIn: true
			};

		case LOGIN_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false
			};
		default:
			return state;
	}
}
