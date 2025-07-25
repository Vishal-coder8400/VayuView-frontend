import {
  ADD_USER_DATA,
  UPDATE_PICKUP,
  LOG_IN,
  LOG_OUT,
  UPDATE_CONFIGURATIONS,
  ADD_INSTANCE,
  UPDATE_INSTANCE,
  DELETE_INSTANCE,
  UPDATE_CURRENT_INSTANCE,
  UPDATE_ALL_INSTANCES,
  TOGGLE_THEME,
  INIT_DATA,
} from "../../common/constant/strings";

/**
 * @returns action object which returns -> initialData for dispatch
 */
export const initData = () => {
  return {
    type: INIT_DATA,
    value: null,
  };
};

/**
 * @param {data}  contains token and role for "value"
 * @returns action object which returns ->{ type , value } for dispatch
 */
export const userLogin = (data) => {
  return {
    type: LOG_IN,
    value: data, // Expecting { token: '...', role: '...' }
  };
};

/**
 * @param {data of the user } data 
 * @returns action object which returns ->{ type , value } for dispatch
 */
export const addUserData = (data) => {
  return {
    type: ADD_USER_DATA,
    value: data,
  };
};

/**
 * @param {data for configs} data 
 * @returns action object which returns ->{ type , value } for dispatch
 */
export const addConfigData = (data) => {
  return {
    type: UPDATE_CONFIGURATIONS,
    value: data,
  };
};

/**
 * @param {data for pickup} data 
 * @returns action object which returns ->{ type , value } for dispatch
 */
export const callForPickup = (data) => {
  return {
    type: UPDATE_PICKUP,
    value: data,
  };
};

/**
 * @returns action object which returns ->{ type , value } for dispatch
 */
export const logout = () => {
  return {
    type: LOG_OUT,
    value: null,
  };
};

export const toggleTheme = (data) => {
  return {
    type: TOGGLE_THEME,
    value: data,
  };
};

export const addInstance = (data) => {
  return {
    type: ADD_INSTANCE,
    value: data,
  };
};

// Action creators for instances
export const updateInstance = (data) => {
  return {
    type: UPDATE_INSTANCE,
    value: data,
  };
};

export const deleteInstance = (id) => {
  return {
    type: DELETE_INSTANCE,
    value: id,
  };
};

export const updateCurrentInstance = (id) => {
  console.log("UPDATE_CURRENT_INSTANCE ACTION", id);
  return {
    type: UPDATE_CURRENT_INSTANCE,
    value: id,
  };
};

export const updateAllInstances = (id) => {
  return {
    type: UPDATE_ALL_INSTANCES,
    value: id,
  };
};
