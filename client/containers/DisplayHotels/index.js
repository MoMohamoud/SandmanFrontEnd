
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { createStructuredSelector } from 'reselect';
import { Drawer, AppBar, IconButton } from 'material-ui';
import { ArrowBack } from 'material-ui-icons';

import { makeSelectSelectHotelResults } from '../../containers/TextSearchBox/selectors';
import SandGoogleMaps from "../../components/SandGoogleMaps/index";
import ListCards from "../../components/ListCards";

import appConfig from '../../appConfig';

const pd = {
  padding: "10px 15px"
};

export class DisplayHotels extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { hotelResults, history } = this.props;

    return (
      <div className="height-100">
        <Helmet {...appConfig.head} />

        <Drawer
          open
          width={'30%'}>

          <AppBar
            style={{ backgroundColor: 'grey' }}
            title="Back To List"
            iconElementLeft={
              <IconButton onClick={() => history.push('/')}>
                <ArrowBack />
              </IconButton>
            }
          />


          {
            (hotelResults && hotelResults[0] && hotelResults[0].id !== undefined) ? (

              <ListCards searchResults={hotelResults} />

            ) : <div style={pd}>
                No Results Found
                </div>
          }

        </Drawer>
        <SandGoogleMaps searchResults={hotelResults} />
        <div id="fakemap2"></div>
      </div >
    );
  }
}

DisplayHotels.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appConfig: PropTypes.object,
  hotelResults: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array),
  ]),
};

const mapStateToProps = createStructuredSelector({
  hotelResults: makeSelectSelectHotelResults(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const connectApp = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  connectApp,
)(DisplayHotels);