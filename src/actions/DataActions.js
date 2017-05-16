import firebase from 'firebase';

import { WATCH_USER_DATA, LOGIN_USER } from './types';

export const watchUserData = (nav, navscreen) => {
    console.log('watchUserData fired!');
    let { currentUser } = firebase.auth();
    console.log('currentuser uid', currentUser.uid);

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: WATCH_USER_DATA, payload: snapshot.val() });
            })
        nav.navigate(navscreen);
    }
}