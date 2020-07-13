import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
    AUTHENTICATE_USER,
    LOG_OUT,
    CLEAR_AUTH_STATE
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
                inProgress: true,
                error:false
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				error: false,
				isLoggedIn: true
			};

		case LOGIN_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false
            };
        case AUTHENTICATE_USER:
            return{
                ...state,
                user: action.user,
				inProgress: false,
				error: false,
				isLoggedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                user:{},
                isLoggedIn:false,
            }
        case CLEAR_AUTH_STATE:
            return {
                ...state,
                error:null,
            }
		default:
			return state;
	}
}
