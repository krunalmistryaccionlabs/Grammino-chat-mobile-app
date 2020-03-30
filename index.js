/**
 * @format
 */
import { AppRegistry } from "react-native";
import App from "./app/index";
import { name as appName } from "./app.json";
import React from "react";
import { Provider } from "react-redux";
import { INITIAL_STATE } from "./app/reducers/storageReducer";
import configureStore from "./app/store";

const store = configureStore(INITIAL_STATE);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
