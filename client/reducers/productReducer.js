import * as types from '../constants/actionTypes';


const products = (state=[], action) => {
    switch(action.type) {
        case types.LOAD_PRODUCTS:
            let items = action.payload;
            return [...state, ...items];
        default:
            return state;
    }
}

export default products