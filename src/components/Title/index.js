import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Text} from './styles';

export default function Title(props) {
  const {style, text} = props;
  return <Text style={style}>{text}</Text>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

Title.defaultProps = {
  style: {},
};
