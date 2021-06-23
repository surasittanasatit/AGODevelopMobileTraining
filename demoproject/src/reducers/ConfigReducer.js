const STATE_INIT = {
  configservice: 'http://localhost:12900',
};

export const ConfigReducer = (state = STATE_INIT, action) => {
  if (action.type == "CONFIG_SERVICE") {
    return {
      ...state,
      configservice: action.payload
    };
  }
  return state;
};
