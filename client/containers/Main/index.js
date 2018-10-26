
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { Card, CardTitle } from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextSearchBox from "../../containers/TextSearchBox";
import appConfig from '../../appConfig';
const sandicon = appConfig.iconImage;

const backgroundImage = "https://images.trvl-media.com/hotels/1000000/990000/980500/980490/6edd0f9d_z.jpg";

const setBgImage = {
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundImage: 'url(' + backgroundImage + ' )',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  height: '100%'
};


function Main(props) {
  return (
    <div style={setBgImage}>
      <Helmet {...appConfig.head} />
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <Grid fluid>
              <Row center='xs'>
                <Col xs={12}>
                  <Card style={{ padding: '5% 10%' }}>
                    <img className="img-res img-size" src={sandicon} alt={appConfig.title} />
                    <CardTitle subtitle="Thank you for choosing Sandman Hotels" />
                    <TextSearchBox {...props} />
                  </Card>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>

    </div>
  );
}

Main.propTypes = {
  appConfig: PropTypes.object,
};

export default Main;
