import {
    WATCH_USER_DATA,
    ITEM_SAVE,
    ITEM_SAVE_SUCCESS,
    ITEM_SAVE_FAIL,
    CLIENT_SAVE,
    CLIENT_SAVE_FAIL,
    CLIENT_SAVE_SUCCESS,
} from '../../actions/types';

const initialState = {
    root: {},
    loading: false,
    error: '',
    confirm: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case WATCH_USER_DATA:
            return { ...state, root: action.payload }
        case ITEM_SAVE:
            return { ...state, loading: true, error: '', confirm: '', }
        case ITEM_SAVE_SUCCESS:
            return { ...state, loading: false, error: '', confirm: 1 }
        case ITEM_SAVE_FAIL:
            return { ...state, loading: false, error: 'Item Save Failed, please try again' }
        case CLIENT_SAVE:
            return { ...state, loading: true, error: '', confirm: '', }
        case CLIENT_SAVE_SUCCESS:
            return { ...state, loading: false, error: '', confirm: 1 }
        case CLIENT_SAVE_FAIL:
            return { ...state, loading: false, error: 'Client Save Failed, please try again' }
        default:
            return state;
    }
}