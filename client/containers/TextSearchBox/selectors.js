import { createSelector } from 'reselect';

const selectMain = (state) => state.get('TextSearchBox');

const makeSelectMainDefault = () => createSelector(
    selectMain,
    (substate) => substate.toJS()
);

const makeSelectSelectSearchCity = () => createSelector(
    selectMain,
    (substate) => substate.get('searchCityResults')
);

const makeSelectSelectSelectedCity = () => createSelector(
  selectMain,
  (substate) => substate.get('selectedCityInfo')
);

const makeSelectSelectSnackBarOpen = () => createSelector(
  selectMain,
  (substate) => substate.get('snackBarOpen')
);

const makeSelectSelectSnackBarMessage = () => createSelector(
  selectMain,
  (substate) => substate.get('snackBarMessage')
);

const makeSelectSelectSelectedDateRange = () => createSelector(
  selectMain,
  (substate) => substate.get('selectedDateRange')
);

const makeSelectSelectHotelLoading = () => createSelector(
  selectMain,
  (substate) => substate.get('hotelDataLoading')
);

const makeSelectSelectHotelResults = () => createSelector(
  selectMain,
  (substate) => substate.get('hotelResults')
);




export {
    selectMain,
    makeSelectMainDefault,
    makeSelectSelectSearchCity,
    makeSelectSelectSelectedCity,
    makeSelectSelectSnackBarOpen,
    makeSelectSelectSnackBarMessage,
    makeSelectSelectSelectedDateRange,
    makeSelectSelectHotelLoading,
    makeSelectSelectHotelResults
};