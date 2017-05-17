import firebase from 'firebase';

import {
    WATCH_USER_DATA,
    ITEM_SAVE,
    ITEM_SAVE_SUCCESS,
    ITEM_SAVE_FAIL
} from './types';

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

export const saveNewItem = (value) => {
    console.log('saveNewItem fired!', value);
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: ITEM_SAVE })
        firebase.database().ref(`/${currentUser.uid}/supplies`)
            .push(value)
            .then(() => {
                dispatch({ type: ITEM_SAVE_SUCCESS })
            })
            .catch((error) => {
                dispatch({ type: ITEM_SAVE_FAIL })
                console.log('Item save failed, here is the error', error);
            })
    }
}

export const updateItem = (uid, value) => {
    console.log('updateItem fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/supplies/${uid}`)
            .update(value);
    }
}

export const deleteItem = (uid) => {
    console.log('deleteItem fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/supplies/${uid}`)
            .remove()
    }
}