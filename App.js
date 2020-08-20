import React from 'react';
import 'react-native-gesture-handler';
import {store, persistor} from 'store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootNavigator} from 'navigation';
import FlashMessage from 'react-native-flash-message';
import {Splash} from 'components';

export const cryp = require('crypto');

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <RootNavigator />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}

export default App;
