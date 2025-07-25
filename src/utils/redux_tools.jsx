/* LIBRARIES */
import debounce from "lodash/debounce";
import {
  addConfigData,
  addUserData,
  logout,
  toggleTheme,
  updateAllInstances,
  userLogin,

  addInstance,
  updateInstance,
  deleteInstance,
  updateCurrentInstance,
} from "../store/actions";
import { connect } from "react-redux";

/**
 * @param {function} cb        callback to perform
 * @param {number}   de_bounce value for debouncing
 * @returns a debounced function
 */
export const debounced = (cb, de_bounce = 100) => {
  return debounce((args) => {
    cb(args);
  }, de_bounce);
};

/**
 * @param {state} redux state
 * @returns the current state
 */
const mapStateToProps = (state) => {
  return state;
};

/**
 * @param {dispatch} redux dispatch
 * @returns returns the callback to dispatch a redux method
 */
const mapDispatchToProps = (dispatch) => {
  return {
    _userLogin: (data) => {
      dispatch(userLogin(data));
    },
    _addUserData: (data) => {
      dispatch(addUserData(data));
    },
    _addConfigData: (data) => {
      dispatch(addConfigData(data));
    },
    _logout: () => {
      dispatch(logout());
    },

    _addInstance: (data) => {
      dispatch(addInstance(data));
    },
    _updateInstance: (data) => {
      dispatch(updateInstance(data));
    },
    _deleteInstance: (id) => {
      dispatch(deleteInstance(id));
    },
    _updateCurrentInstance: (id) => {
      console.log('calling this...ACTIONinstances')
      dispatch(updateCurrentInstance(id));
    },
    _toggleTheme: (data) => {
      dispatch(toggleTheme(data));
    },
    _updateAllInstances: (id) => {
      dispatch(updateAllInstances(id));
    },
  };
};

export const stateConnected = (Component, propTypes) => {
  let ExportComponent = (props) => {
    return <Component {...props}></Component>;
  };

  ExportComponent.propTypes = propTypes;
  return connect(mapStateToProps, mapDispatchToProps)(ExportComponent);
};
