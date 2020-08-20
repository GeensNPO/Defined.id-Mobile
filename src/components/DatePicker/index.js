import React from 'react';
import {ViewPropTypes} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import _ from 'lodash';
import {
  Container,
  SelectContainer,
  Background,
  Placeholder,
  Value,
  Label,
  Content,
  Error,
} from './styles';
import {COLORS} from 'styles';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    autoBind(this);
  }

  handleOnChange(value) {
    this.closeDateModal();
    const {onChange, name} = this.props;
    const date = value.toISOString().split('T')[0];
    onChange({name, value: date});
  }

  openDateModal() {
    this.setState({visible: true});
  }

  closeDateModal() {
    this.setState({visible: false});
    const {onBlur, name} = this.props;
    onBlur({name});
  }

  render() {
    const {
      style,
      value,
      disabled,
      placeholder,
      label,
      error,
      dirty,
    } = this.props;
    const {visible} = this.state;

    const colors =
      (!!error && dirty) || !value
        ? [COLORS.PINK, COLORS.PURPLE]
        : [COLORS.BLUE, COLORS.GREEN];

    return (
      <Container style={style}>
        <Label>{label}</Label>
        <SelectContainer disabled={disabled} onPress={this.openDateModal}>
          <Background colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <Content>
              {!!value && <Value>{value}</Value>}
              {!value && !!placeholder && (
                <Placeholder>{placeholder}</Placeholder>
              )}
            </Content>
          </Background>
        </SelectContainer>
        {!!error && dirty && <Error>{error}</Error>}
        <DateTimePickerModal
          isVisible={visible}
          mode="date"
          date={new Date(value || null)}
          onConfirm={this.handleOnChange}
          onCancel={this.closeDateModal}
        />
      </Container>
    );
  }
}

DatePicker.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  focus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dirty: PropTypes.bool,
  error: PropTypes.string,
};

DatePicker.defaultProps = {
  style: {},
  placeholder: '',
  value: null,
  focus: false,
  disabled: false,
  onBlur: _.noop,
  error: null,
  dirty: false,
};
