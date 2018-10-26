import { createSelector } from 'reselect';

const selectDisplayHotelView = (state) => state.get('DisplayHotelView');

const makeSelectHotelDefault = () => createSelector(
  selectHotelView,
  (substate) => substate.toJS()
);

export {
  selectDisplayHotelView,
  makeSelectHotelDefault
};