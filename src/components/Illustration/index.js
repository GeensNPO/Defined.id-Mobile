import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Container, Description, Image, Title} from './styles';

export default function Illustration(props) {
  const {style, image, title, description} = props;
  return (
    <Container style={style}>
      <Image source={image} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

Illustration.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

Illustration.defaultProps = {
  style: {},
};
