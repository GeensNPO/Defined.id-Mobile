import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Text} from './styles';
import {MESSAGE_TYPES} from 'constants';

export default function Message(props) {
  const {style, text, type} = props;
  return (
    <Text type={type} style={style}>
      {text}
    </Text>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: ViewPropTypes.style,
};

Message.defaultProps = {
  style: {},
  type: MESSAGE_TYPES.DANGER,
};
