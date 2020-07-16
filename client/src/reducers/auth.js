import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
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
				error: false
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
			return {
				...state,
				user: action.user,
				inProgress: false,
				error: false,
				isLoggedIn: true
			};
		case LOG_OUT:
			return {
				...state,
				user: {},
				isLoggedIn: false
			};
		case CLEAR_AUTH_STATE:
			return {
				...state,
				error: null
			};
		case SIGN_UP_START:
			return {
				...state,
				inProgress: true,
				error: false
			};
        //sign up success is not created because the login action will be called once the user is signed up successfully.
		case SIGN_UP_FAILURE:
            return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false
            };
        case UPDATE_USER_START:
            return{
                ...state,
                inProgress:true
            }
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                inProgress:false,
                error:false,
                user:action.user
            }
        case UPDATE_USER_FAILED:
            return{
                ...state,
                inProgress:false,
                error:action.error
            }
        case UPLOAD_AVATAR_START:
            return{
                ...state,
                inProgress:true
            }
        case UPLOAD_AVATAR_SUCCESS:
            return{
                ...state,
                inProgress:false,
                error:false,
                user:action.user
            }
        case UPLOAD_AVATAR_FAILURE:
            return{
                ...state,
                inProgress:false,
                error:action.error
            }
		default:
			return state;
	}
}
