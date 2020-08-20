import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Text} from './styles';

export default function Description(props) {
  const {style, text, center} = props;
  return (
    <Text center={center} style={style}>
      {text}
    </Text>
  );
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
  center: PropTypes.bool,
  style: ViewPropTypes.style,
};

Description.defaultProps = {
  style: {},
  center: false,
};
