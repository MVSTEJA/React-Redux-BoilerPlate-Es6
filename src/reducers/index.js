import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import appData from './homeReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  appData
});

export default rootReducer;
