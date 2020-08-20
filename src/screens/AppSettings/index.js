import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {ScrollableWrapper, SettingsButton} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

function AppSettingsScreen(props) {
  const {navigation} = props;
  const [hasPinCode, setHasPinCode] = useState(false);

  useEffect(() => {
    hasUserSetPinCode().then((value) => {
      setHasPinCode(value);
    });
  });

  return (
    <ScrollableWrapper>
      <Row mb={10}>
        <SettingsButton
          onPress={() => navigation.navigate(SCREENS.SET_PIN_CODE)}
          title="Pin code"
          hasArrow
          image={hasPinCode ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
        />
      </Row>
      <Row mb={10}>
        <SettingsButton
          title="Terms & Conditions"
          hasArrow
          image={IMAGES.CIRCLE_PENDING}
        />
      </Row>
      <Row mb={0}>
        <SettingsButton
          title="Privacy Policy"
          hasArrow
          image={IMAGES.CIRCLE_PENDING}
        />
      </Row>
    </ScrollableWrapper>
  );
}

AppSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {app} = state;
  const {pinCode} = app;
  return {pinCode};
}

export default connect(mapStateToProps)(AppSettingsScreen);
