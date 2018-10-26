
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { AutoComplete, Snackbar, DatePicker, RaisedButton, CircularProgress } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as _ from 'lodash';
import airports from '../../airports';
import {
  makeSelectSelectSearchCity,
  makeSelectSelectSelectedCity,
  makeSelectSelectSnackBarOpen,
  makeSelectSelectSnackBarMessage,
  makeSelectSelectSelectedDateRange,
  makeSelectSelectHotelLoading,
  makeSelectSelectHotelResults
} from './selectors';

import { searchItemUpdatedAction, setSelectedCityInfoAction, showSnackBarAction, setSelectedDateAction, hotelDataRequestAction } from './actions';
import { googlePlacesAutoComplete } from "../../googlePlacesApi";

const dataSourceConfig = {
  text: 'description',
  value: 'place_id',
};


export class TextSearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.setDefaultDataSource()
  };

  render() {
    const { newSearchRequestOnChange, searchCityResults, onNewRequestUserSelectedCity, snackBarOpen, snackBarMessage, onClickCloseSnackBar, selectedDateRange, onChangeDateRange, submitSearch, selectedCityInfo, hotelDataLoading } = this.props;

    return (
      <Col xs={12}>
        <Row >
          {
            (_.isArray(searchCityResults)) ? (
              <Col xs={12}>

                <AutoComplete
                  dataSource={searchCityResults}
                  floatingLabelText={'Selected City'}
                  onUpdateInput={newSearchRequestOnChange}
                  hintText="Search by city to find your hotel"
                  filter={AutoComplete.noFilter}
                  dataSourceConfig={dataSourceConfig}
                  onNewRequest={onNewRequestUserSelectedCity}
                  autoFocus
                  fullWidth
                />
              </Col>

            ) : null
          }


        </Row>
        <Row className="mrg-v-sm">
          <Col md={6}>
            <DatePicker
              hintText="Select Check In Date"
              fullWidth mode="landscape"
              onChange={(event, date) => onChangeDateRange({ checkIn: date })}
              autoOk={true} />
          </Col>
          <Col md={6}>
            <DatePicker
              hintText="Select Check Out Date"
              fullWidth mode="landscape"
              onChange={(event, date) => onChangeDateRange({ checkOut: date })}
              autoOk={true}
            />
          </Col>
        </Row>

        <Row className="mrg-v-sm">
          <Col md={12}>

            {
              (hotelDataLoading) ? (
                <CircularProgress size={60} thickness={7} />

              ) : (
                  <RaisedButton label="Search" primary fullWidth onClick={() => submitSearch({ ... this.props })} disabled={selectedCityInfo && selectedCityInfo.city ? false : true} />
                )
            }
          </Col>
        </Row>




        <Snackbar
          open={snackBarOpen}
          message={snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={onClickCloseSnackBar}
        />

        <div id="fakemap"></div>
      </Col>
    );
  }
}

TextSearchBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appConfig: PropTypes.object,
  newSearchRequestOnChange: PropTypes.func,
  onNewRequestUserSelectedCity: PropTypes.func,
  selectedCityInfo: PropTypes.object,
  setDefaultDataSource: PropTypes.func,
  searchCityResults: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array),
  ]),
  snackBarOpen: PropTypes.bool,
  snackBarMessage: PropTypes.string,
  onClickCloseSnackBar: PropTypes.func,
  onChangeDateRange: PropTypes.func,
  selectedDateRange: PropTypes.object,
  submitSearch: PropTypes.func,
  hotelDataLoading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  searchCityResults: makeSelectSelectSearchCity(),
  selectedCityInfo: makeSelectSelectSelectedCity(),
  snackBarOpen: makeSelectSelectSnackBarOpen(),
  snackBarMessage: makeSelectSelectSnackBarMessage(),
  selectedDateRange: makeSelectSelectSelectedDateRange(),
  hotelDataLoading: makeSelectSelectHotelLoading(),
  hotelResults: makeSelectSelectHotelResults()
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    onNewRequestUserSelectedCity: (data) => new Promise((resolve, reject) => {
      if (data && data.structured_formatting === undefined || data.structured_formatting.main_text === undefined) {
        return reject('Airport Not Found')
      }
      const findAirport = _.find(airports, { city: data.structured_formatting.main_text });
      if (!findAirport) {
        return reject('Airport Not Found')
      }
      return resolve(findAirport)
    }).then((res) => {
      dispatch(setSelectedCityInfoAction(res))
      console.log(res)
    }, (err) => {
      const errObj = {
        snackBarOpen: true,
        snackBarMessage: err
      };
      dispatch(showSnackBarAction(errObj));

    }),
    newSearchRequestOnChange: (data) => new Promise((resolve, reject) => {
      googlePlacesAutoComplete(data, resolve, reject);
    }).then((data) => {
      dispatch(searchItemUpdatedAction(data));
    }, (err) => {
      console.log('err', err);
    }),
    setDefaultDataSource: () => {
      dispatch(searchItemUpdatedAction([]));
    },
    onClickCloseSnackBar: () => {
      const closeSnackBarObj = {
        snackBarOpen: false,
        snackBarMessage: ""
      };
      dispatch(showSnackBarAction(closeSnackBarObj));
    },
    onChangeDateRange: (data) => {
      dispatch(setSelectedDateAction(data));
    },
    submitSearch: (props) => {
      const { selectedCityInfo, selectedDateRange } = props;
      const startDate = moment(selectedDateRange.checkIn).format('YYYY-MM-DD');
      const endDate = moment(selectedDateRange.checkOut).format('YYYY-MM-DD');

      const searchParams = `airport=${selectedCityInfo.code}&startDate=${startDate}&endDate=${endDate}`;
      dispatch(hotelDataRequestAction(searchParams));
    },
  }
}

const connectApp = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  connectApp,
)(TextSearchBox);