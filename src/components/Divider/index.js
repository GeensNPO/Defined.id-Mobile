import React from 'react';
import {ViewPropTypes} from 'react-native';
import {Container} from './styles';
import {COLORS} from 'styles';

function Divider(props) {
  const {style} = props;

  return (
    <Container
      colors={[COLORS.PINK, COLORS.PURPLE]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style}
    />
  );
}

Divider.propTypes = {
  style: ViewPropTypes.style,
};

Divider.defaultProps = {
  style: {},
};

export default Divider;
