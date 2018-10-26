import { fromJS } from 'immutable';
import * as _ from 'lodash';

import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  hotelResults: [],
  hotelDataLoading: false,
});


function displayHotelViewReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default displayHotelViewReducer;
