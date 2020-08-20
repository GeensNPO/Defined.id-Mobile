import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Text, Container} from './styles';
import _ from 'lodash';

export default function Tag(props) {
  const {style, text, onPress} = props;

  return (
    <Container onPress={onPress} style={style}>
      <Text>{text}</Text>
    </Container>
  );
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

Tag.defaultProps = {
  style: {},
  onPress: _.noop,
};
