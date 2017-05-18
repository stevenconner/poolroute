import {
    PULL_DAY
} from '../../actions/types';

const initialState = {
    root: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PULL_DAY:
            return { ...state, root: action.payload }
        default:
            return state;
    }
}