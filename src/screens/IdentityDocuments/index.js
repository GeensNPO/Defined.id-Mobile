import React from 'react';
import * as PropTypes from 'prop-types';
import {ScrollableWrapper, SettingsButton} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';

function IdentityDocumentsScreen(props) {
  const {
    navigation,
    passportPhoto,
    nationalIdPhoto,
    drivingLicensePhoto,
  } = props;

  const renderPassportButton = () => {
    const hasValue = !!passportPhoto.base64;

    return (
      <SettingsButton
        onPress={() => navigation.navigate(SCREENS.PASSPORT)}
        title="Passport"
        hasArrow
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderNationalIdButton = () => {
    const hasValue = !!nationalIdPhoto.base64;

    return (
      <SettingsButton
        onPress={() => navigation.navigate(SCREENS.NATIONAL_ID)}
        title="National ID"
        hasArrow
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderDrivingLicenseButton = () => {
    const hasValue = !!drivingLicensePhoto.base64;

    return (
      <SettingsButton
        onPress={() => navigation.navigate(SCREENS.DRIVING_LICENSE)}
        title="Driving license"
        hasArrow
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  return (
    <ScrollableWrapper>
      <Row mb={10}>{renderPassportButton()}</Row>
      <Row mb={10}>{renderNationalIdButton()}</Row>
      <Row mb={0}>{renderDrivingLicenseButton()}</Row>
    </ScrollableWrapper>
  );
}

IdentityDocumentsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  passportPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  nationalIdPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  drivingLicensePhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {drivingLicensePhoto, passportPhoto, nationalIdPhoto} = account;
  return {drivingLicensePhoto, passportPhoto, nationalIdPhoto};
}

export default connect(mapStateToProps)(IdentityDocumentsScreen);
