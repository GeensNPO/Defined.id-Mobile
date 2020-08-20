import React, {useState} from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import Modal from '../Modal';
import {BUTTONS, Row} from 'styles';
import Description from '../Description';
import SettingsButton from '../SettingsButton';
import {IMAGES} from 'constants';
import {Content} from './styles';
import Button from '../Button';
import {ConnectionsService} from 'services';

function UpdateConnectionModal(props) {
  const {
    style,
    onClose,
    visible,
    onVerify,
    data,
    loading,
    onDecline,
    index,
  } = props;

  const invalid = data.claimsRequested?.find((claim) => {
    const {key} = claim;
    const value = ConnectionsService.getValueByClaimKey(key);
    return value === '';
  });

  return (
    <Modal
      visible={visible}
      title="Update Connection"
      style={style}
      onClose={onClose}>
      <Row mb={30} center>
        <Description center text="Issuer want to use your data" />
      </Row>
      {data.claimsRequested && (
        <Content>
          {data.claimsRequested.map((claim, i) => {
            const {key, label} = claim;
            const value = ConnectionsService.getValueByClaimKey(key);
            return (
              <Row key={i} mb={10}>
                <SettingsButton
                  reversed
                  description={value}
                  image={!value ? IMAGES.CIRCLE_DENIED : IMAGES.CIRCLE_ACCEPTED}
                  title={label}
                />
              </Row>
            );
          })}
        </Content>
      )}
      <Row center>
        <Button
          disabled={loading || !!invalid}
          loading={loading}
          onPress={() => onVerify({index})}
          title="Accept"
        />
      </Row>
      <Row center>
        <Button
          type={BUTTONS.SECONDARY}
          loading={loading}
          onPress={onDecline}
          disabled={loading || !!invalid}
          title="Decline"
        />
      </Row>
    </Modal>
  );
}

UpdateConnectionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  data: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
  loading: PropTypes.bool,
};

UpdateConnectionModal.defaultProps = {
  style: {},
  visible: false,
  loading: false,
};

export default UpdateConnectionModal;
