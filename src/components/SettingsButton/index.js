import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Container, Title, Description, Content, Image, Arrow} from './styles';
import _ from 'lodash';
import {IMAGES} from 'constants';

export default function SettingsButton(props) {
  const {
    style,
    title,
    description,
    onPress,
    disabled,
    reversed,
    image,
    danger,
    hasArrow,
    success,
  } = props;

  let formattedDescription = reversed ? title : description;
  let formattedTitle = reversed ? description : title;

  return (
    <Container disabled={disabled} onPress={onPress} style={style}>
      <Image source={image} />
      <Content reversed={reversed}>
        <Title numberOfLines={1}>{formattedTitle}</Title>
        {!!formattedDescription && (
          <Description numberOfLines={1} success={success} danger={danger}>
            {formattedDescription}
          </Description>
        )}
      </Content>
      {hasArrow && <Arrow source={IMAGES.NEXT} />}
    </Container>
  );
}

SettingsButton.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
  reversed: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  hasArrow: PropTypes.bool,
  danger: PropTypes.bool,
  style: ViewPropTypes.style,
  image: PropTypes.number.isRequired,
};

SettingsButton.defaultProps = {
  style: {},
  description: '',
  reversed: false,
  onPress: _.noop,
  danger: false,
  disabled: false,
  hasArrow: false,
  success: false,
};
