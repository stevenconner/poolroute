import {
    WATCH_USER_DATA
} from '../../actions/types';

const initialState = {
    root: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case WATCH_USER_DATA:
            return { ...state, root: action.payload }
        default:
            return state;
    }
}