const hopsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOPS':
            return [...state, action.payload];
        // case 'CLEAR_HOPS':
        //     return state;
        default:
            return state;
    }
};

export default hopsReducer;