/* LIBRARIES */
import { applyMiddleware, compose, createStore } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* ABSOLUTE IMPORTS */
import rootReducer from "./reducers";

// 🔐 Encrypt only if enabled
const transforms =
  process.env.REACT_APP_ENCRYPT === "true"
    ? [
        encryptTransform({
          secretKey: process.env.REACT_APP_SECRET || "default-secret", // Fallback to default if not set
          onError: (error) => {
            console.error("Redux Encrypt Error:", error);
          },
        }),
      ]
    : [];

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userData"], // persist only necessary slices
  transforms,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Redux DevTools setup for development
const composeEnhancers =
  process.env.REACT_APP_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : compose;

// Create Redux store
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware()));

// Persistor
const persistor = persistStore(store);

export { store, persistor };
