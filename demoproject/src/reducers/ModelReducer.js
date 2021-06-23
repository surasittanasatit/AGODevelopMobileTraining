const STATE_INIT = {
    cardata: [],
};

export const ModelReducer = (state = STATE_INIT, action) => {
    if (action.type == "CarData") {
        return {
            ...state,
            cardata: action.payload
        };
    }
    return state;
};
