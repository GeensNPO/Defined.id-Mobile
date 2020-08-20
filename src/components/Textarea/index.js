import React, {useState} from 'react';
import {ViewPropTypes} from 'react-native';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import {Container, TextInput, Label, Error} from './styles';
import {COLORS} from 'styles';

function Textarea(props) {
  const {
    style,
    placeholder,
    onBlur,
    onChange,
    name,
    value,
    disabled,
    autoFocus,
    label,
    error,
    dirty,
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

  return (
    <Container focus={focus} style={style}>
      <Label>{label}</Label>
      <TextInput
        multiline={true}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        placeholderTextColor={COLORS.LIGHT_GREY}
        onBlur={handleOnBlur}
        onFocus={() => setFocus(true)}
        value={value}
        onChange={handleOnChange}
      />
      {!!error && dirty && <Error>{error}</Error>}
    </Container>
  );
}

Textarea.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  dirty: PropTypes.bool,
  error: PropTypes.string,
};

Textarea.defaultProps = {
  style: {},
  placeholder: '',
  value: null,
  label: '',
  onBlur: _.noop,
  autoFocus: false,
  disabled: false,
  error: null,
  dirty: false,
};

export default Textarea;
