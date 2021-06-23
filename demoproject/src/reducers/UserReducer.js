const STATE_INIT = {
    userdata: {},
};

export const UserReducer = (state = STATE_INIT, action) => {
    if (action.type == "UserAction") {
        return {
            ...state,
            userdata: action.payload
        };
    }
    return state;
};
