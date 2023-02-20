import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { BookData } from '../../interface';

// Define action type constants
const STORE_DATA = 'STORE_DATA';

// Define action interface with a payload
export interface StoreDataAction extends Action<typeof STORE_DATA> {
	payload: BookData;
}

// Defining action creator function using the ActionCreator type
const storeData: ActionCreator<StoreDataAction> = (data: BookData) => {
	return {
		type: STORE_DATA,
		payload: data,
	};
};

// Define async action creator function using the ThunkAction type
const fetchData = (): ThunkAction<void, BookData, unknown, StoreDataAction> => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://nyx.vima.ekt.gr:3000/api/books');
			const data = response.data.books;
			dispatch(storeData(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export { storeData, fetchData };
