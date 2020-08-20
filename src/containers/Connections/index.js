import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CONNECTION_STATUSES, IMAGES} from 'constants';
import {
  ConnectionContainer,
  Container,
  EmptyContainer,
  EmptyIllustration,
  Header,
  List,
  SectionTitle,
  Separator,
} from './styles';
import {SettingsButton} from 'components';
import autoBind from 'auto-bind';

class Connections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      connections: [],
    };

    autoBind(this);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  componentDidUpdate(prevProps): void {
    const {connections} = this.props;
    if (connections.length !== prevProps.connections.length) {
      this.onRefresh();
    }
  }

  onRefresh() {
    const {connections} = this.props;
    this.setState({
      connections: connections,
      isRefreshing: false,
    });
  }

  renderItem(item, index) {
    const {onSelect} = this.props;

    let image;
    let description;

    if (item.status === CONNECTION_STATUSES.UNVERIFIED) {
      image = IMAGES.CIRCLE_DENIED;
      description = 'Attributes rejected or mismatched';
    }

    if (item.status === CONNECTION_STATUSES.PENDING) {
      image = IMAGES.CIRCLE_PENDING;
      description = 'Attributes is pending to accept';
    }

    if (item.status === CONNECTION_STATUSES.VERIFIED) {
      image = IMAGES.CIRCLE_ACCEPTED;
      description = 'Attributes were successfully accepted';
    }

    return (
      <ConnectionContainer>
        <SettingsButton
          hasArrow
          onPress={() => onSelect(index)}
          image={image}
          title={item.data.requestName}
          description={description}
        />
      </ConnectionContainer>
    );
  }

  renderEmpty() {
    return (
      <EmptyContainer>
        <EmptyIllustration
          image={IMAGES.CONNECTIONS_ILLUSTRATION}
          description="Scan a QR code to connect with another party and exchange information."
          title="Connections"
        />
      </EmptyContainer>
    );
  }

  render() {
    const {style} = this.props;
    const {connections, isRefreshing} = this.state;

    return (
      <Container style={style}>
        {connections.length > 0 && (
          <Header>
            <SectionTitle>Connections</SectionTitle>
          </Header>
        )}
        <List
          refreshing={isRefreshing}
          onRefresh={this.onRefresh}
          ListEmptyComponent={this.renderEmpty()}
          ItemSeparatorComponent={() => <Separator />}
          data={connections}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    );
  }
}

Connections.propTypes = {
  connections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

Connections.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {connections} = state;
  return {connections: connections.connections};
}

export default connect(mapStateToProps)(Connections);
