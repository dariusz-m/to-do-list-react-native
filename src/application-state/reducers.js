import { combineReducers } from 'redux';

import toDoReducer from '../tasks/reducer';
import authReducer from '../authentication/reducer';

export default combineReducers({
    todo: toDoReducer,
    auth: authReducer,
});
