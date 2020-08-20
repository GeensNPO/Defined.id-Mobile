import React from 'react';
import {ScrollView, ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Wrapper} from './styles';
import GradientWrapper from '../GradientWrapper';

export default function ScrollableWrapper(props) {
  const {style, children} = props;

  return (
    <GradientWrapper style={style}>
      <ScrollView>
        <Wrapper>{children}</Wrapper>
      </ScrollView>
    </GradientWrapper>
  );
}

ScrollableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

ScrollableWrapper.defaultProps = {
  style: {},
};
