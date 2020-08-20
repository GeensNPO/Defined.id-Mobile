import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {Container, Content, Footer, Section, SectionTitle} from './styles';
import {
  Button,
  ClaimStatus,
  SettingsButton,
  UpdateConnectionModal,
} from 'components';
import {Row} from 'styles';
import {connect} from 'react-redux';
import {CONNECTION_STATUSES, IMAGES} from 'constants';
import {connections as actions} from 'actions';
import {ConnectionsService, FlashMessagesService} from 'services';

function ConnectionDetailsScreen(props) {
  const {route, connections, verifyConnection, declineConnection} = props;
  const [modalVisible, setModelVisible] = useState(false);
  const connection = connections[route.params.id];
  const {data, status} = connection;
  const {claimsRequested} = data;

  const decline = () => {
    declineConnection({index: route.params.id}, () => {
      setModelVisible(false);
      FlashMessagesService.showSuccess('Connection successfully declined');
    });
  };

  const verify = () => {
    verifyConnection({index: route.params.id}, () => {
      setModelVisible(false);
      FlashMessagesService.showSuccess('Connection successfully verified');
    });
  };

  const timestampText = () => {
    if (status === CONNECTION_STATUSES.PENDING) {
      return 'Declined / Accepted';
    }

    if (status === CONNECTION_STATUSES.VERIFIED) {
      return 'Accepted';
    }

    if (status === CONNECTION_STATUSES.UNVERIFIED) {
      return 'Declined';
    }
  };

  console.log(connection);

  return (
    <Container>
      <Content>
        <Row center mb={30}>
          <ClaimStatus
            timestampText={timestampText()}
            timestampDate={connection.statusUpdateDate}
            creationDate={connection.date}
            expirationDate={data.expirationDate}
          />
        </Row>
        <Section>
          <SectionTitle>Claims</SectionTitle>
          {claimsRequested.map((claim, i) => {
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
        </Section>
      </Content>
      <Footer>
        {connection.status === CONNECTION_STATUSES.PENDING && (
          <Row center>
            <Button onPress={() => setModelVisible(true)} title="Update" />
          </Row>
        )}
      </Footer>
      <UpdateConnectionModal
        visible={modalVisible}
        data={data}
        onDecline={decline}
        onVerify={verify}
        onClose={() => setModelVisible(false)}
      />
    </Container>
  );
}

ConnectionDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  connections: PropTypes.array.isRequired,
  verifyConnection: PropTypes.func.isRequired,
  declineConnection: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {connections} = state;
  return {
    connections: connections.connections,
    isLoading: connections.isLoading,
  };
}

export default connect(mapStateToProps, {
  verifyConnection: actions.verifyConnection,
  declineConnection: actions.declineConnection,
})(ConnectionDetailsScreen);
