import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {
  Background,
  Container,
  Content,
  Label,
  SelectContainer,
  Value,
} from './styles';
import {COLORS} from 'styles';
import {FlashMessagesService} from 'services';
import Clipboard from '@react-native-community/clipboard';

function ClipboardText(props) {
  const {style, value, label} = props;

  const onPress = () => {
    FlashMessagesService.showSuccess('Copied to clipboard');
    Clipboard.setString(value);
  };

  return (
    <Container style={style}>
      <Label>{label}</Label>
      <SelectContainer onPress={onPress}>
        <Background
          colors={[COLORS.BLUE, COLORS.GREEN]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Content>
            <Value numberOfLines={1}>{value}</Value>
          </Content>
        </Background>
      </SelectContainer>
    </Container>
  );
}

ClipboardText.propTypes = {
  style: ViewPropTypes.style,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ClipboardText.defaultProps = {
  style: {},
};

export default ClipboardText;
