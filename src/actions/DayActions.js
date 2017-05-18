import firebase from 'firebase';

import {
    PULL_DAY
} from './types';

export const pullDay = () => {
    console.log('pullDay fired!');
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}/day`)
            .once()
    }
}

export const makeDay = () => {
    console.log('makeDay fired!');
    let { currentUser } = firebase.auth();
    let obj = {};
    obj['day'] = {
        dayOfWeek: new Date().getDay(),
    }

    return (dispatch) => {
        firebase.database().ref(`/${currentUser.uid}`)
            .update(obj)
    }
}