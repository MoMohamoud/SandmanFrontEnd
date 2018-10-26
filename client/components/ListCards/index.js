import React from 'react';

import PropTypes from 'prop-types';

import * as _ from 'lodash';
import {  Row, Col } from 'react-flexbox-grid';
import { Divider } from 'material-ui';


import CustomTheme from '../../styles/custom-theme';
import appConfig from '../../appConfig';

const sandicon = appConfig.iconImage;

const setBgImage = {
  backgroundSize: '80px, 92px',
  backgroundPosition: 'center center',
  height: '92px',
  width: '80px',
  backgroundImage: 'url(' + sandicon + ' )',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  margin: 'auto'
};

const pd = {
  padding: "10px 15px",
  cursor: 'pointer',
};

const currencyStyle = {
  width: "15px",
  color: CustomTheme.palette.successColor
};

const openStyle = {
  fontSize: ".8em",
  color: CustomTheme.palette.accent4Color
};

const DisplayItem = (values) => {
  const { props } = values;
  let imageStyle = Object.assign({}, setBgImage);

  return (
    <div key={props.place_id} style={pd}>
      <Row >
        <Col md={9} xs={12}>
          <div>
            {props.name}
          </div>
          <div>
            {props.address.line1},{props.address.city}
          </div>
          <div>
            <span className="fn-sm" style={{ marginRight: "3px" }}>
              {props.phoneNumber[0].detail}
            </span>

          </div>
          <div style={currencyStyle}>
            ${props.price.amount}
          </div>

          <div style={openStyle}>
            Closed Now
          </div>
        </Col>
        <Col md={3} xs={12}>
          <div style={imageStyle}></div>
        </Col>
      </Row>
      <Divider />
    </div>

  )
}

function ListCards(props) {
  const { searchResults } = props;
  return (

    <div>
      {
        _.map(searchResults, (item) => {
          if (item && item.id !== undefined) {
            return (
              <DisplayItem key={item.id} props={item} />
            )
          }
        })
      }
    </div>

  );
}

ListCards.propTypes = {
  searchResults: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(Array),
  ]),
};

export default ListCards;
