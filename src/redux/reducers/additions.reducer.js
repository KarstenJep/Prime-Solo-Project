const additionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADDITIONS':
            return action.payload;
        default:
            return state;
    }
};

export default additionsReducer;