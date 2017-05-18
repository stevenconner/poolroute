import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';
import DayReducer from './DayReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: AuthReducer,
        data: DataReducer,
        day: DayReducer,
    });
}