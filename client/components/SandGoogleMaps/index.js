import React from 'react';

import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { LocationOn } from 'material-ui-icons';
import * as _ from 'lodash';

import CustomTheme from '../../styles/custom-theme';
import appConfig from '../../appConfig';

const brandColor = {
  color: CustomTheme.palette.primary1Color,
};

const coords = appConfig.defaultLocation;

const lat = coords.lat;
const lng = coords.lng;

const apiKeyValue = 'AIzaSyBAc-JawWSCY0lcJfOxUFYSw80VASTHiyA';
let defaultProps = {
  center: [lat, lng],
  zoom: 14,
  lat,
  lng,
};

let styleMap = {
  width: '100%',
  height: '100%',
}

const SimpleMap = ({ values }) => (
  <div>
    < LocationOn style={brandColor} />
    {values}
  </div>
);


function SandGoogleMaps(props) {
  const { searchResults } = props;
  if (searchResults && searchResults.length !== 0 && searchResults[0] && searchResults[0].id !== undefined && searchResults[0].location !== undefined) {
    const location = searchResults[0].location;
    defaultProps.center = [location.latitude, location.longitude];
    }
  return (
    <div style={styleMap}>

      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKeyValue,
          language: 'en',
          libraries: 'places',
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        {
          (searchResults && searchResults.length !== 0 && searchResults[0] && searchResults[0].id !== undefined) ? (
            _.map(searchResults, (item) => {
              if (item && item.location) {
                const location = item.location;
                item.lat = location.latitude;
                item.lng = location.longitude;

                return (
                  <SimpleMap
                    key={item.id}
                    lat={item.lat}
                    lng={item.lng}
                  />

                )
              }
            })
          ) : null

        }

      </GoogleMapReact>

    </div>
  );
}

SandGoogleMaps.propTypes = {
  searchResults: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array),
  ]),
};

export default SandGoogleMaps;
