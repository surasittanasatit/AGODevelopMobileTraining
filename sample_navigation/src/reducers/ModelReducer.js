const STATE_INIT = {
    tabmenuindex: 0,
};

export const ModelReducer = (state = STATE_INIT, action) => {
    if (action.type == "TAB_MENU_INDEX") {
        return {
            ...state,
            tabmenuindex: action.payload
        };
    }
    return state;
};
