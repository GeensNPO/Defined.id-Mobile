import React from 'react';
import * as PropTypes from 'prop-types';
import {Container} from './styles';
import {NameAndSurnameForm} from 'containers';
import {connect} from 'react-redux';
import {account as actions} from 'actions';
import {SCREENS} from 'navigation';
import {Description} from 'components';
import {Row} from 'styles';

function NameAndSurnameScreen(props) {
  const {formData, updateNameAndSurname, navigation} = props;

  const save = (request) => {
    updateNameAndSurname(request);
    navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
  };

  return (
    <Container>
      <Row mb={30}>
        <Description
          center
          text="Add your name and surname to build your identity once and reuse it for connections, login & proofs later."
        />
      </Row>
      <NameAndSurnameForm onSubmit={save} formData={formData} />
    </Container>
  );
}

NameAndSurnameScreen.propTypes = {
  updateNameAndSurname: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {account} = state;
  const {name, surname} = account;
  const formData = {name, surname};
  return {formData};
}

export default connect(mapStateToProps, {
  updateNameAndSurname: actions.updateNameAndSurname,
})(NameAndSurnameScreen);
