export const configAction = {
  getActionUrlServices: configservice => {
    return {
      type: "CONFIG_SERVICE",
      payload: configservice
    };
  },
};
