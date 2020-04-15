import {SET_DATA, RESET_DATA} from '../actions/userDataActions';

const userDataReducer = (state = { data: []}, action) => {
    console.log(action)
    switch (action.type) {
        case SET_DATA:
            return {...state, data: action.data};
        case RESET_DATA:
            return {};
        default:
            return {...state};
    }
};

export default userDataReducer;