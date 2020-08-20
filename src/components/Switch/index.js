import React, {Component} from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import {Container, SlideContainer, Slider, SliderWrapper} from './styles';
import {COLORS} from 'styles';

class Switch extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  toggle() {
    const {onChange, name, checked} = this.props;
    onChange({name, value: !checked});
  }

  render() {
    const {style, checked, disabled} = this.props;

    const colors = checked
      ? [COLORS.BLUE, COLORS.GREEN]
      : [COLORS.PINK, COLORS.PURPLE];

    return (
      <Container disabled={disabled} style={style} onPress={this.toggle}>
        <SlideContainer
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          checked={checked}>
          <SliderWrapper>
            <Slider
              colors={colors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              checked={checked}
            />
          </SliderWrapper>
        </SlideContainer>
      </Container>
    );
  }
}

Switch.propTypes = {
  style: ViewPropTypes.style,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  style: {},
  checked: false,
  disabled: false,
};

export default Switch;
