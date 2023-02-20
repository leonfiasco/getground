const initialState = {
	// bookData: [],
};

const rootReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'STORE_DATA':
			return { ...state, bookData: action.payload };
		default:
			return state;
	}
};

export default rootReducer;
