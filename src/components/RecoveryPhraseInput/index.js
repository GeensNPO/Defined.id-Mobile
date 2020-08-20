import React from 'react';
import {ViewPropTypes} from 'react-native';
import * as PropTypes from 'prop-types';
import {Background, Container, Input, List} from './styles';
import _ from 'lodash';
import autoBind from 'auto-bind';
import {COLORS} from 'styles';

class RecoveryPhraseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recoveryPhrase: _.fill(Array(12), ''),
    };

    autoBind(this);
  }

  renderInput(item, index) {
    const colors = !item
      ? [COLORS.PINK, COLORS.PURPLE]
      : [COLORS.BLUE, COLORS.GREEN];

    return (
      <Background
        key={index}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}>
        <Input
          placeholder={(index + 1).toString()}
          value={item}
          onChange={(event) => this.handleChange(event, index)}
        />
      </Background>
    );
  }

  handleChange(event, index) {
    const {nativeEvent} = event;
    const {text} = nativeEvent;
    const {recoveryPhrase} = this.state;
    const {onChange} = this.props;
    const updatedRecoveryPhrase = recoveryPhrase;
    updatedRecoveryPhrase[index] = text;
    this.setState({
      recoveryPhrase: updatedRecoveryPhrase,
    });
    onChange(updatedRecoveryPhrase);
  }

  render() {
    const {style} = this.props;
    const {recoveryPhrase} = this.state;

    return (
      <Container style={style}>
        <List
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => this.renderInput(item, index)}
          data={recoveryPhrase}
        />
      </Container>
    );
  }
}

RecoveryPhraseInput.propTypes = {
  style: ViewPropTypes.style,
  onChange: PropTypes.func.isRequired,
};

RecoveryPhraseInput.defaultProps = {
  style: {},
};

export default RecoveryPhraseInput;
