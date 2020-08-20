import React from 'react';
import * as PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import {Background, Container, Title, Wrapper, Loading} from './styles';
import {BUTTONS, COLORS} from 'styles';

function Button(props) {
  const {title, style, disabled, onPress, type, small, loading} = props;

  const colors =
    type === BUTTONS.SECONDARY
      ? [COLORS.PINK, COLORS.PURPLE]
      : [COLORS.BLUE, COLORS.GREEN];

  return (
    <Container
      small={small}
      type={type}
      disabled={disabled || loading}
      style={style}
      onPress={onPress}>
      <Background
        small={small}
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Wrapper small={small} disabled={disabled || loading}>
          <Title small={small} disabled={disabled || loading} type={type}>
            {title}
          </Title>
          {loading && <Loading color={COLORS.PINK} />}
        </Wrapper>
      </Background>
    </Container>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  style: {},
  disabled: false,
  small: false,
  loading: false,
  type: BUTTONS.PRIMARY,
};

export default Button;
