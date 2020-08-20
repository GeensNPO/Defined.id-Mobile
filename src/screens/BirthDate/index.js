import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {BirthDateForm} from 'containers';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Row} from 'styles';
import {Description} from 'components';

function BirthDateScreen(props) {
  const {formData, updateBirthDate, navigation} = props;

  const save = (request) => {
    updateBirthDate(request);
    navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
  };

  return (
    <Container>
      <Row mb={30}>
        <Description
          center
          text="Add your birth date to build your identity once and reuse it for connections, login & proofs later."
        />
      </Row>
      <BirthDateForm onSubmit={save} formData={formData} />
    </Container>
  );
}

BirthDateScreen.propTypes = {
  updateBirthDate: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    birthDate: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {birthDate} = account;
  const formData = {birthDate};
  return {formData};
}

export default connect(mapStateToProps, {
  updateBirthDate: actions.updateBirthDate,
})(BirthDateScreen);
