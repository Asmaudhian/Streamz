import counterReducer from './counterReducer';
import userDataReducer from './userDataReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    counter: counterReducer,
    userData: userDataReducer
});

export default rootReducer;