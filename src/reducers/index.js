import {combineReducers} from 'redux';
import account from './account';
import app from './app';
import nem from './nem';
import backup from './backup';
import credentials from './credentials';
import connections from './connections';

const rootReducer = combineReducers({
  account,
  app,
  nem,
  backup,
  credentials,
  connections,
});

export {rootReducer};
