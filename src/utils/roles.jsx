/* LIBRARIES */

const { store } = require("../store");

/**
 * shows the error alert
 */
const getUserRole = () => {
  return store.getState().userData?.role === "customer" &&
    store.getState().userData.user.user_role === "useradmin"
    ? "useradmin"
    : store.getState().userData?.role === "customer" &&
      (store.getState().userData.user.user_role !== "useradmin" ||
        store.getState().userData.user.user_role !== "executive")
    ? "executive"
    : "admin";
};

const getCompanyId = () => {
    return store.getState().userData?.user?.company;
}

const getUserId = () => {
    return store.getState().userData?.user?._id;
}

module.exports.getUserRole = getUserRole;
module.exports.getCompanyId = getCompanyId;
module.exports.getUserId = getUserId;
