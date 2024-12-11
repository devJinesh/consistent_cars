import { GET_ALL_BOOK_SERVICES, BOOK_SERVICE } from '../actions/bookServiceActions';

const initialState = {
    bookServices: [], // Ensure this is defined
};

const bookServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOK_SERVICES:
            return { ...state, bookServices: action.payload };
        case BOOK_SERVICE:
            return { ...state }; // You can add logic to update the state if needed
        default:
            return state;
    }
};

export default bookServiceReducer;