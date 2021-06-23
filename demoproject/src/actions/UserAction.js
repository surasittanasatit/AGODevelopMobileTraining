export const userAction = {
    getActionUserData: userdata => {
        return {
            type: "UserAction",
            payload: userdata,
        };
    },
};
