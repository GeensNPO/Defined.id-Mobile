import React from 'react';
import * as PropTypes from 'prop-types';
import {Container, ScannerContainer, ScannerWrapper} from './styles';
import {
  Description,
  SectionTitle,
  Title,
  UpdateConnectionModal,
} from 'components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Row} from 'styles';
import {connect} from 'react-redux';
import {connections as actions} from 'actions';
import {NAVIGATORS, SCREENS} from 'navigation';
import autoBind from 'auto-bind';

class ScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      data: {},
    };

    this.scanner = null;
    autoBind(this);
  }

  navigate() {
    const {navigation} = this.props;
    navigation.navigate(NAVIGATORS.CONNECTIONS, {
      screen: SCREENS.CONNECTION_SUCCESS,
    });
    this.scanner.reactivate();
  }

  decline() {
    const {declineConnection, addedConnectionIndex} = this.props;
    declineConnection({index: addedConnectionIndex}, () => {
      this.closeModal();
      this.scanner.reactivate();
    });
  }

  verify() {
    const {verifyConnection, addedConnectionIndex} = this.props;
    verifyConnection({index: addedConnectionIndex}, this.navigate);
  }

  setData(data) {
    this.setState({
      data,
    });
  }

  openModal() {
    this.setState({
      modalVisible: true,
    });
  }

  closeModal() {
    this.scanner.reactivate();
    this.setState({
      modalVisible: false,
    });
  }

  scan(scannerData) {
    const {addConnection} = this.props;
    const request = JSON.parse(scannerData.data);

    addConnection({data: request}, () => {
      this.setData(request);
      this.openModal();
    });
  }

  render() {
    const {modalVisible, data} = this.state;

    return (
      <Container>
        <Row mb={30}>
          <Title text="Create New Connection" />
        </Row>
        <ScannerContainer>
          <ScannerWrapper>
            <QRCodeScanner
              ref={(node) => {
                this.scanner = node;
              }}
              onRead={this.scan}
            />
          </ScannerWrapper>
          <Row mb={10} center>
            <SectionTitle text="Scan QR code" />
          </Row>
          <Row mb={0} center>
            <Description
              center
              text="Place and hold your camera to scan QR code."
            />
          </Row>
        </ScannerContainer>
        <UpdateConnectionModal
          visible={modalVisible}
          data={data}
          onDecline={this.decline}
          onVerify={this.verify}
          onClose={this.closeModal}
        />
      </Container>
    );
  }
}

ScannerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  addConnection: PropTypes.func.isRequired,
  verifyConnection: PropTypes.func.isRequired,
  declineConnection: PropTypes.func.isRequired,
  addedConnectionIndex: PropTypes.number,
};

function mapStateToProps(state) {
  const {connections} = state;
  const {addedConnectionIndex} = connections;
  return {addedConnectionIndex};
}

export default connect(mapStateToProps, {
  addConnection: actions.addConnection,
  verifyConnection: actions.verifyConnection,
  declineConnection: actions.declineConnection,
})(ScannerScreen);
