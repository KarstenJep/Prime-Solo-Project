const hopsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOPS':
            return action.payload;
        default:
            return state;
    }
};

export default hopsReducer;