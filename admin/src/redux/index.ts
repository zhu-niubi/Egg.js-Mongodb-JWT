import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import searchTable, { SearchTableState } from '../pages/search-table/redux/reducer';
import login, { UserLoginState } from '../pages/login/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  searchTable: SearchTableState;
  login: UserLoginState;
}

export default combineReducers({
  global,
  searchTable,
  login,
});
