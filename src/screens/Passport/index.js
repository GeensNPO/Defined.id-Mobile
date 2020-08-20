import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {Container, Wrapper} from './styles';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Button, Description, SectionTitle} from 'components';
import {BUTTONS, Row} from 'styles';
import {DocumentPhoto} from 'containers';

function PassportScreen(props) {
  const {passportPhoto, updatePassportPhoto, navigation} = props;
  const [photo, setPhoto] = useState(passportPhoto);

  const save = () => {
    updatePassportPhoto(photo.base64);
    navigation.navigate(SCREENS.IDENTITY_DOCUMENTS);
  };

  return (
    <Container>
      <Wrapper>
        <Row center mb={25}>
          <DocumentPhoto
            documentPhoto={photo}
            onPhotoSelect={(base64) => setPhoto({base64})}
          />
        </Row>
        <Row center mb={10}>
          <SectionTitle text="Browse" />
        </Row>
        <Row center mb={0}>
          <Description
            center
            text="Upload or take a clear photo of the main page of your passport"
          />
        </Row>
      </Wrapper>
      <Row mb={0} center>
        <Button
          type={BUTTONS.SECONDARY}
          title="Save"
          onPress={save}
          disabled={!photo.base64}
        />
      </Row>
    </Container>
  );
}

PassportScreen.propTypes = {
  updatePassportPhoto: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  passportPhoto: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {passportPhoto} = account;
  return {passportPhoto};
}

export default connect(mapStateToProps, {
  updatePassportPhoto: actions.updatePassportPhoto,
})(PassportScreen);
