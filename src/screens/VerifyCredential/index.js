import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {
  Container,
  Content,
  Footer,
  ItemDetails,
  ItemDetailsWrapper,
  ItemIcon,
  ItemMain,
  ItemTitle,
} from './styles';
import {Button, DatePicker, Description, SettingsButton} from 'components';
import {Row} from 'styles';
import {IMAGES} from 'constants';
import {connect} from 'react-redux';
import {credentials as actions} from 'actions';

function VerifyCredentialScreen(props) {
  const {
    route,
    unverifiedCredentials,
    verifyCredential,
    totalAmount,
    isLoading,
  } = props;
  const credential = unverifiedCredentials[route.params.id];

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const [expirationDate, setExpirationDate] = useState(
    tomorrow.toISOString().split('T')[0],
  );

  const verify = () => {
    const credentials = credential.credentials || [];
    const claims = credential.claims || [];
    verifyCredential({
      expirationDate,
      claim: credentials.concat(claims),
      index: route.params.id,
    });
  };

  return (
    <Container>
      <Content>
        <Row center mb={20}>
          <Description text="You are about to verify claim" />
        </Row>
        <Row mb={50}>
          <SettingsButton
            reversed
            image={IMAGES.CIRCLE_DENIED}
            title={credential.title}
            description={credential.description}
          />
        </Row>
        <Row center>
          <DatePicker
            value={expirationDate}
            label="Expiration date"
            dirty
            error={
              expirationDate &&
              new Date(expirationDate).getTime() <= new Date().getTime()
                ? 'Date can not be in past'
                : null
            }
            onChange={({value}) => setExpirationDate(value)}
            name="expirationDate"
          />
        </Row>
      </Content>
      <Footer>
        <Row mb={20} center>
          <Description center text="0.2 XYM will be charged from your wallet" />
        </Row>
        <Row center>
          <ItemMain mb={15} spaceBetween>
            <ItemDetailsWrapper>
              <ItemIcon source={IMAGES.NEM_ICON} />
              <ItemDetails>
                <ItemTitle>NEM</ItemTitle>
                <Description text="Nem.io network" />
              </ItemDetails>
            </ItemDetailsWrapper>
            <ItemDetails>
              <ItemTitle>{`${totalAmount} XYM`}</ItemTitle>
              <Description text={`${totalAmount} USD`} />
            </ItemDetails>
          </ItemMain>
        </Row>
        <Row mb={20} center>
          <Description
            center
            text="This action will be recorded in the blockchain and can take up to 1 min. to be confirmed."
          />
        </Row>
        <Row center mb={0}>
          <Button
            disabled={
              !expirationDate ||
              new Date(expirationDate).getTime() <= new Date().getTime()
            }
            onPress={verify}
            loading={isLoading}
            title="Verify"
          />
        </Row>
      </Footer>
    </Container>
  );
}

VerifyCredentialScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  unverifiedCredentials: PropTypes.array.isRequired,
  verifyCredential: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {credentials, nem} = state;
  const {unverifiedCredentials, isLoading} = credentials;
  const {totalAmount} = nem;
  return {unverifiedCredentials, totalAmount, isLoading};
}

export default connect(mapStateToProps, {
  verifyCredential: actions.verifyCredential,
})(VerifyCredentialScreen);
