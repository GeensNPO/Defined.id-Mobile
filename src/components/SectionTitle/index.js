import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Text} from './styles';

export default function SectionTitle(props) {
  const {style, text} = props;
  return <Text style={style}>{text}</Text>;
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

SectionTitle.defaultProps = {
  style: {},
};
