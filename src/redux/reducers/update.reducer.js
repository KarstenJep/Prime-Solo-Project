const updateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UPDATE':
            return action.payload;
        default:
            return state;
    }
};

export default updateReducer;