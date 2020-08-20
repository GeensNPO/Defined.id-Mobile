import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {COLORS} from 'styles';

export default function GradientWrapper(props) {
  const {style, children} = props;

  const colors = [COLORS.WHITE, COLORS.LIGHT_GREY_2];

  return (
    <Container
      style={style}
      colors={colors}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      {children}
    </Container>
  );
}

GradientWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

GradientWrapper.defaultProps = {
  style: {},
};
