import axios from 'axios';
import { message } from 'antd';

export const GET_ALL_BOOK_SERVICES = 'GET_ALL_BOOK_SERVICES';
export const BOOK_SERVICE = 'BOOK_SERVICE';

export const getAllBookServices = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/book-services'); // Adjust this path as necessary
        dispatch({ type: GET_ALL_BOOK_SERVICES, payload: response.data });
    } catch (error) {
        console.error(error);
        message.error('Failed to fetch book services');
    }
};

export const bookService = (reqObj) => async (dispatch) => {
    try {
        const response = await axios.post('/api/book-service', reqObj); // Adjust this path as necessary
        dispatch({ type: BOOK_SERVICE, payload: response.data });
        message.success('Service booked successfully');
    } catch (error) {
        console.error(error);
        message.error('Failed to book service');
    }
};