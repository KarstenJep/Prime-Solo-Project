const updateReducer = (state = {}, action) => {
    // console.log('in UR', action);
    switch (action.type) {
        case 'SET_UPDATE':
            return action.payload;
        default:
            return state;
    }
};

export default updateReducer;