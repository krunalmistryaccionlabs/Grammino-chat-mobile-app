/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './app/reducers/storageReducer';

const store = createStore(reducer);

const AppContainer = () =>
    <Provider store={store}>
        <App />
    </Provider>


AppRegistry.registerComponent(appName, () => AppContainer);
