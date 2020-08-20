import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {AsyncStorage} from 'react-native';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from 'reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

// persistor.purge();
// deleteUserPinCode();

export {store, persistor};
