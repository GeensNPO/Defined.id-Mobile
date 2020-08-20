import React from 'react';
import {ViewPropTypes} from 'react-native';
import {Container, Logo} from './styles';
import {IMAGES} from 'constants';

export default function Splash(props) {
  const {style} = props;
  return (
    <Container style={style}>
      <Logo source={IMAGES.DID_LOGO} />
    </Container>
  );
}

Splash.propTypes = {
  style: ViewPropTypes.style,
};

Splash.defaultProps = {
  style: {},
};
