import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOG_OUT,
} from '../../actions/types';

const initialState = {
    error: '',
    loading: false,
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            return { ...state, ...initialState, user: action.payload }
        case LOGIN_USER_FAIL:
            return { ...state, loading: false, error: 'Login Failed, please try again' }
        case LOG_OUT:
            return { ...state, ...initialState }
        default:
            return state;
    }
}