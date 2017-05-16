import firebase from 'firebase';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOG_OUT } from './types';

export const loginUserWithEmail = ({ email, password }) => {
    return (dispatch) => {
        console.log('loginUserWithEmail fired!');
        dispatch({ type: LOGIN_USER })

        // Attempt to sign in the user to firebase with email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => loginUserFail(dispatch, error))
    }
}

export const logOut = () => {
    return (dispatch) => {
        dispatch({ type: LOG_OUT })

        firebase.auth().signOut();
    }
}

const loginUserSuccess = (dispatch, user) => {
    console.log('loginUserSuccess fired! here is the user:', user);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

const loginUserFail = (dispatch, error) => {
    console.log('loginUserFail fired! here is the error:', error);
    dispatch({
        type: LOGIN_USER_FAIL,
    })
}