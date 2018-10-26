import { fromJS } from 'immutable';
import * as _ from 'lodash';

import {
  DEFAULT_ACTION,
  SUCCESS_SEARCH_CITY_LIST,
  SUCCESS_SELECTED_CITY_INFO,
  SHOW_DIALOG,
  SET_SELECTED_DATE,
  HOTEL_DATA_LOADING,
  HOTEL_DATA_REQUEST,
  HOTEL_DATA_SUCCESS,
  HOTEL_DATA_ERROR,

} from './constants';

const initialState = fromJS({
  searchCityResults: [],
  selectedCityInfo: {},
  snackBarOpen: false,
  snackBarMessage: "",
  selectedDateRange: {},
  hotelResults: [],
  hotelDataLoading: false,
});


function textSearchBoxReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUCCESS_SEARCH_CITY_LIST:
      return state
        .set('searchCityResults', action.data);
    case SUCCESS_SELECTED_CITY_INFO:
      return state
        .set('selectedCityInfo', action.data);
    case SHOW_DIALOG:
      return state
        .set('snackBarOpen', action.data.snackBarOpen)
        .set('snackBarMessage', action.data.snackBarMessage)
    case SET_SELECTED_DATE:
      const currentState = state.toJS();
      const selectedTimeState = Object.assign({}, currentState.selectedDateRange);
      _.forOwn(action.data, (value, key) => {
        selectedTimeState[key] = value;
      });
      return state
        .set('selectedDateRange', selectedTimeState);
    case HOTEL_DATA_LOADING:
      return state
        .set('hotelDataLoading', action.data);
    case HOTEL_DATA_SUCCESS:
      return state
        .set('hotelResults', action.data);

    default:
      return state;
  }
}

export default textSearchBoxReducer;
