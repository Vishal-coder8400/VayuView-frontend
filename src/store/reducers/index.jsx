/* LIBRARIES */
import {
  INIT_DATA,
  LOG_IN,
  ADD_USER_DATA,
  UPDATE_PICKUP,
  ADD_INSTANCE,
  UPDATE_INSTANCE,
  DELETE_INSTANCE,
  UPDATE_CURRENT_INSTANCE,
  UPDATE_ALL_INSTANCES,
} from "../../common/constant/strings";

/* ABSOLUTE IMPORTS */

function keyGenerate(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Initial state
const initialState = {
  auth: {
    dns: null,
    token: null,
    role: null, // Added role to store user role
  },
  userData: {},
  configs: {
    key: keyGenerate(18),
  },
  callForPickup: false,
  instances: [
    { id: 0, instance: 0, secs: 10, height: 1080, width: 1920, data: [] },
  ],
  currentInstance: 0,
};

/**
 * Reducer function
 */
const reducer = (state = initialState, action) => {
  console.log("REDUX ACTION:", action);
  switch (action.type) {
    case INIT_DATA:
      return initialState;

    case LOG_IN:
      // Expecting action.value = { token: string, role: string }
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.value.token || null,
          role: action.value.role || null,
        },
      };

    case ADD_USER_DATA:
      return {
        ...state,
        userData: action.value,
      };

    case UPDATE_PICKUP:
      return {
        ...state,
        callForPickup: !state.callForPickup,
      };

    case ADD_INSTANCE:
      return {
        ...state,
        instances: [...state.instances, action.value],
      };

    case UPDATE_INSTANCE:
      return {
        ...state,
        instances: state.instances.map((item, index) =>
          index === action.value.id
            ? {
                id: index,
                instance: index,
                secs: action.value.secs ? action.value.secs : item.secs,
                height: action.value.height ? action.value.height : item.height,
                width: action.value.width ? action.value.width : item.width,
                data: action.value.data ? [...action.value.data] : [...item.data],
              }
            : item
        ),
      };

    case DELETE_INSTANCE:
      const indexToRemove = action.value;
      const updatedData = [
        ...state.instances.slice(0, indexToRemove),
        ...state.instances.slice(indexToRemove + 1),
      ].map((element, index) => ({
        ...element,
        id: index,
        instance: index,
      }));
      return {
        ...state,
        instances: updatedData,
      };

    case UPDATE_CURRENT_INSTANCE:
      return {
        ...state,
        currentInstance: action.value,
      };

    case UPDATE_ALL_INSTANCES:
      if (!action.value || action.value.length === 0) {
        return {
          ...state,
          instances: [
            {
              id: 0,
              secs: 10,
              instance: 0,
              height: 1080,
              width: 1920,
              data: [],
            },
          ],
        };
      }
      return {
        ...state,
        instances: [...action.value],
      };

    default:
      return state;
  }
};

export default reducer;
