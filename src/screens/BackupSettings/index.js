import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Container,
  Content,
  Section,
  SectionTitle,
  SpaceBetweenContent,
  SwitchRow,
} from './styles';
import {
  Description,
  Divider,
  Message,
  SettingsButton,
  Switch,
} from 'components';
import {Row} from 'styles';
import {GEENS, IMAGES} from 'constants';
import {connect} from 'react-redux';
import {backup as actions} from 'actions';
import autoBind from 'auto-bind';
import {Linking} from 'react-native';
import {GeensService} from 'services';
import {SCREENS} from 'navigation';

class BackupSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL({url}) {
    const {getAccessToken, navigation} = this.props;
    if (url) {
      const code = GeensService.parseCode(url);
      getAccessToken(code, () => {
        navigation.navigate(SCREENS.GEENS_SUCCESS);
      });
    }
  }

  renderSetupContent() {
    const {autoBackup, updateAutoBackup} = this.props;
    return (
      <Section>
        <Row center mb={25}>
          <SectionTitle>Backup status</SectionTitle>
        </Row>
        <Content>
          <SettingsButton
            description="Last update 20 OCT 2020 I 14:15"
            image={IMAGES.GEENS_ICON}
            hasArrow
            title="Auto Backup"
          />
          <SwitchRow>
            <SectionTitle>Auto Backup</SectionTitle>
            <Switch
              onChange={() => updateAutoBackup(!autoBackup)}
              checked={autoBackup}
              name="backup"
            />
          </SwitchRow>
        </Content>
      </Section>
    );
  }

  renderNotSetupContent() {
    return (
      <SpaceBetweenContent>
        <Section>
          <Row mb={15}>
            <Message text="Your account is at risk. Please backup your Defined.id account to ensure that you can recover in case of device loss." />
          </Row>
          <Row mb={0}>
            <SettingsButton
              onPress={() => Linking.openURL(GEENS.LINK)}
              description="Account At Risk"
              image={IMAGES.GEENS_ICON}
              danger
              hasArrow
              title="Set Up Geens Account"
            />
          </Row>
        </Section>
        <Section>
          <Row center mb={15}>
            <Description
              center
              text="You will be prompted to Geens.com NPO (Non-Profit-Organisation) E2E Encrypted Cloud Service."
            />
          </Row>
          <Row center mb={15}>
            <Description
              center
              text="Login to existing or set up a new account for storing Defined.id account backup."
            />
          </Row>
          <Row center mb={25}>
            <Description center text="Learn more about Geens.com" />
          </Row>
          <Row center>
            <Divider />
          </Row>
        </Section>
      </SpaceBetweenContent>
    );
  }

  render() {
    const {isCompleted} = this.props;

    return (
      <Container>
        {isCompleted ? this.renderSetupContent() : this.renderNotSetupContent()}
      </Container>
    );
  }
}

BackupSettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  updateAutoBackup: PropTypes.func.isRequired,
  getAccessToken: PropTypes.func.isRequired,
  autoBackup: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {backup} = state;
  const {autoBackup, isCompleted} = backup;
  return {autoBackup, isCompleted};
}

export default connect(mapStateToProps, {
  updateAutoBackup: actions.updateAutoBackup,
  getAccessToken: actions.getAccessToken,
})(BackupSettingsScreen);
