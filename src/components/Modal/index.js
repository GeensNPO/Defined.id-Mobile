import React from 'react';
import {Modal as RnModal, ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {BackButton, BackText, Container, Header} from './styles';
import Title from '../Title';
import {IMAGES} from 'constants';
import {BackIcon} from 'navigation/styles';
import {Row} from 'styles';

function Modal(props) {
  const {style, children, visible, title, onClose} = props;
  return (
    <RnModal
      presentationStyle="pageSheet"
      animationType="slide"
      visible={visible}
      style={style}>
      <Container>
        <Header>
          <Row mb={20}>
            <BackButton onPress={onClose}>
              <BackIcon source={IMAGES.CLOSE} />
              <BackText>Close</BackText>
            </BackButton>
          </Row>
          <Row mb={25}>
            <Title text={title} />
          </Row>
        </Header>
        {children}
      </Container>
    </RnModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  style: ViewPropTypes.style,
};

Modal.defaultProps = {
  style: {},
  visible: false,
};

export default Modal;
