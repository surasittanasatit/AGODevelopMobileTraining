const STATE_INIT = {
  configservice: 'http://192.168.223.76:12550',
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
