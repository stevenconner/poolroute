import firebase from 'firebase';

import {
    WATCH_USER_DATA,
    ITEM_SAVE,
    ITEM_SAVE_SUCCESS,
    ITEM_SAVE_FAIL,
    CLIENT_SAVE,
    CLIENT_SAVE_SUCCESS,
    CLIENT_SAVE_FAIL,
    SELECT_CLIENT,
} from './types';

export const watchUserData = (nav, navscreen) => {
    console.log('watchUserData fired!');
    let { currentUser } = firebase.auth();
    console.log('currentuser uid', currentUser.uid);

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}`)
            .on('value', snapshot => {
                console.log('here is snapshot', snapshot.val())
                dispatch({ type: WATCH_USER_DATA, payload: snapshot.val() });
                let snap = snapshot.val();
                if (!snap.hasOwnProperty('userInfo')) {
                    let currentLocation = navigator.geolocation.getCurrentPosition((response) => {
                        firebase.database().ref(`/${currentUser.uid}/userInfo`)
                            .update({endingLocation: `${response.coords.latitude},${response.coords.longitude}`})
                    })
                }
            })
        nav.navigate(navscreen);
    }
}

export const selectClient = (uid) => {
    return (dispatch) => {
        dispatch({
            type: SELECT_CLIENT,
            payload: uid
        })
    }
}

export const saveNewClient = (value) => {
    console.log('saveNewClient fired!', value);
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: CLIENT_SAVE })
        firebase.database().ref(`/${currentUser.uid}/clients`)
            .push(value)
            .then(() => {
                dispatch({ type: CLIENT_SAVE_SUCCESS })
            })
            .catch((error) => {
                dispatch({ type: CLIENT_SAVE_FAIL })
                console.log('Client save failed, here is the error', error);
            })
    }
}

export const updateClient = (uid, value) => {
    console.log('updateClient fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/clients/${uid}`)
            .update(value);
    }
}

export const deleteClient = (uid) => {
    console.log('deleteClient fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/clients/${uid}`)
            .remove();
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

export const assignItem = (item, client) => {
    console.log('assignItem fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/clients/${client.uid}/equipment`)
            .push(item);
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

export const updateEndingLocation = (location) => {
    console.log('updateEndingLocation fired!');
    let { currentUser } = firebase.auth();
    let obj = {};
    obj['endingLocation'] = location

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/userInfo`)
            .update(obj)
    }
}