import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import  { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./App.css";
import './style.scss'
import { persistor, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <>
            <Routing />
            <Toaster />
          </>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
