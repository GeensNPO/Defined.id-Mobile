import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Description,
  Divider,
  ScrollableWrapper,
  SettingsButton,
  SectionTitle,
} from 'components';
import {IMAGES} from 'constants';
import {Row} from 'styles';
import {SCREENS} from 'navigation';
import {connect} from 'react-redux';
import {ProfilePhoto} from 'containers';

function AccountSettingsScreen(props) {
  const {
    navigation,
    name,
    surname,
    birthDate,
    city,
    country,
    firstAddressLine,
    email,
    passportPhoto,
    nationalIdPhoto,
    drivingLicensePhoto,
    phone,
  } = props;

  const renderNameAndSurnameButton = () => {
    const hasValue = !!name && !!surname;
    const description = hasValue ? `${name} ${surname}` : null;

    return (
      <SettingsButton
        description={description}
        title="Name and Surname"
        hasArrow
        reversed={hasValue}
        onPress={() => navigation.navigate(SCREENS.NAME_AND_SURNAME)}
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderAddressButton = () => {
    const hasValue = !!city && !!country && !!firstAddressLine;
    const description = hasValue
      ? `${firstAddressLine}, ${city} ${country}`
      : null;

    return (
      <SettingsButton
        description={description}
        title="Address"
        hasArrow
        reversed={hasValue}
        onPress={() => navigation.navigate(SCREENS.ADDRESS)}
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderBirthDateButton = () => {
    const hasValue = !!birthDate;
    const description = hasValue ? birthDate : null;

    return (
      <SettingsButton
        description={description}
        title="Birth Date"
        hasArrow
        reversed={hasValue}
        onPress={() => navigation.navigate(SCREENS.BIRTH_DATE)}
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderEmailButton = () => {
    const hasValue = !!email;
    const description = hasValue ? email : null;

    return (
      <SettingsButton
        description={description}
        title="Email"
        hasArrow
        reversed={hasValue}
        onPress={() => navigation.navigate(SCREENS.EMAIL)}
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderPhoneButton = () => {
    const hasValue = !!phone;
    const description = hasValue ? phone : null;

    return (
      <SettingsButton
        description={description}
        title="Phone Number"
        hasArrow
        reversed={hasValue}
        onPress={() => navigation.navigate(SCREENS.PHONE)}
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  const renderIdentityDocumentsButton = () => {
    const hasValue =
      !!passportPhoto.base64 &&
      !!drivingLicensePhoto.base64 &&
      !!nationalIdPhoto.base64;

    return (
      <SettingsButton
        onPress={() => navigation.navigate(SCREENS.IDENTITY_DOCUMENTS)}
        title="Identity documents"
        hasArrow
        image={hasValue ? IMAGES.CIRCLE_ACCEPTED : IMAGES.CIRCLE_PENDING}
      />
    );
  };

  return (
    <ScrollableWrapper>
      <Row mb={20} center>
        <SectionTitle text="Photo" />
      </Row>
      <Row mb={20} center>
        <ProfilePhoto />
      </Row>
      <Row center mb={2}>
        <Description text="A photo helps personalize and" />
      </Row>
      <Row center mb={30}>
        <Description text="recognize your account." />
      </Row>
      <Row mb={30} center>
        <Divider />
      </Row>
      <Row mb={10}>{renderNameAndSurnameButton()}</Row>
      <Row mb={10}>{renderAddressButton()}</Row>
      <Row mb={10}>{renderBirthDateButton()}</Row>
      <Row mb={10}>{renderEmailButton()}</Row>
      <Row mb={10}>{renderPhoneButton()}</Row>
      <Row mb={0}>{renderIdentityDocumentsButton()}</Row>
    </ScrollableWrapper>
  );
}

AccountSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  firstAddressLine: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  nationalIdPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  drivingLicensePhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
  passportPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {
    account: {
      name,
      surname,
      email,
      birthDate,
      phone,
      drivingLicensePhoto,
      passportPhoto,
      nationalIdPhoto,
      country,
      city,
      firstAddressLine,
    },
  } = state;

  return {
    name,
    surname,
    country,
    city,
    firstAddressLine,
    email,
    birthDate,
    phone,
    drivingLicensePhoto,
    passportPhoto,
    nationalIdPhoto,
  };
}

export default connect(mapStateToProps)(AccountSettingsScreen);
