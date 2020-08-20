import React from 'react';
import {ViewPropTypes, ScrollView} from 'react-native';
import * as PropTypes from 'prop-types';
import Modal from '../Modal';
import SettingsButton from '../SettingsButton';
import {IMAGES} from 'constants';
import {connect} from 'react-redux';
import {BUTTONS, Row} from 'styles';
import {Content} from './styles';
import Button from '../Button';
import autoBind from 'auto-bind';

class ClaimsPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCredentialsIndexes: [],
    };

    autoBind(this);
  }

  toggleCredential(index) {
    const {selectedCredentialsIndexes} = this.state;
    const newSelectedCredentialsIndexes = selectedCredentialsIndexes;

    if (newSelectedCredentialsIndexes.includes(index)) {
      const elementIndex = newSelectedCredentialsIndexes.indexOf(index);
      newSelectedCredentialsIndexes.splice(elementIndex, 1);
    } else {
      newSelectedCredentialsIndexes.push(index);
    }

    this.setState({
      selectedCredentialsIndexes: newSelectedCredentialsIndexes,
    });
  }

  submit() {
    const {onSubmit, unverifiedCredentials} = this.props;
    const {selectedCredentialsIndexes} = this.state;
    const data = [];

    selectedCredentialsIndexes.map((index) => {
      data.push(unverifiedCredentials[index]);
    });

    this.setState({
      selectedCredentialsIndexes: [],
    });

    onSubmit(data);
  }

  render() {
    const {style, onClose, visible, unverifiedCredentials} = this.props;
    const {selectedCredentialsIndexes} = this.state;

    return (
      <Modal
        visible={visible}
        title="Existing Claims"
        style={style}
        onClose={onClose}>
        <ScrollView>
          <Content>
            {unverifiedCredentials.map((unverifiedCredential, index) => (
              <Row key={index} mb={10}>
                <SettingsButton
                  onPress={() => this.toggleCredential(index)}
                  image={
                    selectedCredentialsIndexes.includes(index)
                      ? IMAGES.DOT_FILL
                      : IMAGES.DOT_EMPTY
                  }
                  reversed
                  title={unverifiedCredential.title}
                  description={unverifiedCredential.description}
                />
              </Row>
            ))}
          </Content>
        </ScrollView>
        <Row center mb={0}>
          <Button
            disabled={selectedCredentialsIndexes.length === 0}
            onPress={this.submit}
            title="Select"
            type={BUTTONS.SECONDARY}
          />
        </Row>
      </Modal>
    );
  }
}

ClaimsPicker.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  unverifiedCredentials: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  style: ViewPropTypes.style,
};

ClaimsPicker.defaultProps = {
  style: {},
  visible: false,
};

function mapStateToProps(state) {
  const {credentials} = state;
  const {unverifiedCredentials} = credentials;
  return {unverifiedCredentials};
}

export default connect(mapStateToProps)(ClaimsPicker);
