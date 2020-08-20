import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CLAIM_STATUSES, IMAGES} from 'constants';
import {
  ClaimContainer,
  Container,
  EmptyContainer,
  EmptyIllustration,
  Icon,
  IconContainer,
  List,
  SectionTitle,
  Separator,
  Header,
} from './styles';
import {Button, SettingsButton} from 'components';
import autoBind from 'auto-bind';
import {Row} from 'styles';
import {Footer} from 'screens/Credentials/styles';
import {SCREENS} from 'navigation/constants';
import {NavigationService} from 'services';

class Credentials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      credentials: [],
    };

    autoBind(this);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh() {
    const {unverifiedCredentials} = this.props;
    this.setState(
      {
        credentials: unverifiedCredentials,
        isRefreshing: false,
      },
      () => {
        this.forceUpdate();
      },
    );
  }

  renderItem(item, index) {
    const {onSelect} = this.props;

    return (
      <ClaimContainer>
        <SettingsButton
          hasArrow
          reversed
          onPress={() => onSelect(index)}
          image={
            item.status === CLAIM_STATUSES.UNVERIFIED
              ? IMAGES.CIRCLE_DENIED
              : IMAGES.CIRCLE_ACCEPTED
          }
          title={item.title}
          description={item.description}
        />
      </ClaimContainer>
    );
  }

  renderEmpty() {
    return (
      <EmptyContainer>
        <Row mb={0}>
          <EmptyIllustration
            image={IMAGES.CREDENTIALS_ILLUSTRATION}
            description="Add attributes such as name or ID to your profile in settings & build a list with reusable credentials."
            title="Credentials"
          />
        </Row>
      </EmptyContainer>
    );
  }

  render() {
    const {style, onNewCredentialPress} = this.props;
    const {credentials, isRefreshing} = this.state;

    return (
      <Container style={style}>
        {credentials.length > 0 && (
          <Header>
            <SectionTitle>Credentials</SectionTitle>
            <IconContainer onPress={onNewCredentialPress}>
              <Icon source={IMAGES.ADD_NEW} />
            </IconContainer>
          </Header>
        )}
        <List
          refreshing={isRefreshing}
          onRefresh={this.onRefresh}
          ListEmptyComponent={this.renderEmpty()}
          ItemSeparatorComponent={() => <Separator />}
          data={credentials}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    );
  }
}

Credentials.propTypes = {
  onNewCredentialPress: PropTypes.func.isRequired,
  unverifiedCredentials: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

Credentials.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {credentials} = state;
  const {unverifiedCredentials} = credentials;
  return {unverifiedCredentials};
}

export default connect(mapStateToProps)(Credentials);
