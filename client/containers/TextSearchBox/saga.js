// /* eslint-disable no-constant-condition */

import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from './helperRequest';

import {
  HOTEL_DATA_REQUEST
} from './constants';

import {
  hotelDataLoadingAction,
  hotelDataSuccessAction,
  hotelDataErrorAction
} from './actions';



// Individual exports for testing
export default function* defaultSaga() {
  yield fork(getHotelList)
};

function* getHotelList() {
  while (true) {
    const data = yield take(HOTEL_DATA_REQUEST);
    yield call(getHotels, data);
  }
}


function* getHotels(data) { // eslint-disable-line consistent-return
  yield put(hotelDataLoadingAction(true));
  const requestValue = `http://localhost:8000/?${data.data}`;

  try {
    const response = yield call(request, requestValue, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    yield put(hotelDataSuccessAction(response));
    yield put(hotelDataLoadingAction(false));
    yield put(push('/hotels'));

  } catch (err) {
    yield put(hotelDataErrorAction(err));
    yield put(hotelDataLoadingAction(false));
  }
}