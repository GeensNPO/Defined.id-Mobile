import React, {useState} from 'react';
import {ViewPropTypes} from 'react-native';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import {Container, TextInput, Label, Background, Error} from './styles';
import {COLORS} from 'styles';

function Input(props) {
  const {
    style,
    placeholder,
    onBlur,
    onChange,
    name,
    value,
    disabled,
    autoFocus,
    keyboardType,
    label,
    error,
    dirty,
    secureTextEntry,
  } = props;

  const [focus, setFocus] = useState(false);

  const handleOnChange = (event) => {
    const {nativeEvent} = event;
    const {text} = nativeEvent;
    onChange({name, value: text});
  };

  const handleOnBlur = () => {
    onBlur({name});
    setFocus(false);
  };

  const colors =
    (!!error && dirty) || !value
      ? [COLORS.PINK, COLORS.PURPLE]
      : [COLORS.BLUE, COLORS.GREEN];

  return (
    <Container focus={focus} style={style}>
      <Label>{label}</Label>
      <Background start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors}>
        <TextInput
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          disabled={disabled}
          placeholder={placeholder}
          placeholderTextColor={COLORS.LIGHT_GREY}
          onBlur={handleOnBlur}
          onFocus={() => setFocus(true)}
          value={value}
          onChange={handleOnChange}
        />
      </Background>
      {!!error && dirty && <Error>{error}</Error>}
    </Container>
  );
}

Input.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  onBlur: PropTypes.func,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  dirty: PropTypes.bool,
  error: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  placeholder: '',
  value: null,
  label: '',
  onBlur: _.noop,
  keyboardType: 'default',
  autoFocus: false,
  disabled: false,
  secureTextEntry: false,
  error: null,
  dirty: false,
};

export default Input;
