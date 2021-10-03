const hopsReducer = (state = [], action) => {
    // console.log('in HR', action.type);
    switch (action.type) {
        case 'SET_HOPS':
            return [...state, action.payload];
        case 'CLEAR_HOPS':
            return [];
        default:
            return state;
    }
};

export default hopsReducer;