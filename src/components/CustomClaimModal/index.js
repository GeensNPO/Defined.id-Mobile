import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import Modal from '../Modal';
import {CustomClaimForm} from 'containers';

class CustomClaimModal extends React.Component {
  render() {
    const {style, onClose, visible, onSubmit} = this.props;
    return (
      <Modal
        visible={visible}
        title="Create Claim"
        style={style}
        onClose={onClose}>
        <CustomClaimForm onSubmit={onSubmit} />
      </Modal>
    );
  }
}

CustomClaimModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  style: ViewPropTypes.style,
};

CustomClaimModal.defaultProps = {
  style: {},
  visible: false,
};

export default CustomClaimModal;
