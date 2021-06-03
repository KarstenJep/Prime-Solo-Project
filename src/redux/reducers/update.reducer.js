const updateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UPDATE':
            return action.payload;
        case 'EDIT_ONCHANGE':
            console.log('in edit reducer', action.payload);
            return { // spread: give me all of the object (...state)
                ...state,
                // change this one in particular
                [action.payload.property]: action.payload.value,
            }
        default:
            return state;
    }
};

export default updateReducer;