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

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function searchItemUpdatedAction(data) {
    return {
        type: SUCCESS_SEARCH_CITY_LIST,
        data
    };
}

export function setSelectedCityInfoAction(data) {
    return {
        type: SUCCESS_SELECTED_CITY_INFO,
        data
    };
}

export function showSnackBarAction(data) {
  return {
      type: SHOW_DIALOG,
      data
  };
}

export function setSelectedDateAction(data) {
  return {
      type: SET_SELECTED_DATE,
      data
  };
}


export function hotelDataLoadingAction(data) {
  return {
    type: HOTEL_DATA_LOADING,
    data
  };
};

export function hotelDataRequestAction(data) {
  return {
    type: HOTEL_DATA_REQUEST,
    data
  };
};


export function hotelDataSuccessAction(data) {
  return {
    type: HOTEL_DATA_SUCCESS,
    data
  };
};

export function hotelDataErrorAction(data) {
  return {
    type: HOTEL_DATA_ERROR,
    data
  };
};


