import React, {Component} from 'react';
import {FlatList, ViewPropTypes} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {nem as actions} from 'actions';
import {Container, PhraseContainer, PhraseText, Separator} from './styles';
import autoBind from 'auto-bind';
import _ from 'lodash';
import {FlashMessagesService} from 'services';

class ConfirmSeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPhrases: [],
      randomRecoveryPhrases: [],
    };

    autoBind(this);
  }

  componentDidMount() {
    this.initPhrases();
  }

  initPhrases() {
    const {recoveryPhrase} = this.props;

    this.setState({
      randomRecoveryPhrases: _.shuffle(recoveryPhrase),
      inputPhrases: recoveryPhrase.map(() => {
        return {};
      }),
    });
  }

  onChange = () => {
    const {inputPhrases} = this.state;
    const {recoveryPhrase} = this.props;
    const {onChange} = this.props;

    const existEmptyInputPhrases = !!inputPhrases.find(
      (phrase) => Object.keys(phrase).length === 0,
    );

    const inputRecoveryPhraseString = inputPhrases
      .map((phrase) => phrase.phrase)
      .join('');

    const match = recoveryPhrase.join('') === inputRecoveryPhraseString;

    if (!existEmptyInputPhrases && !match) {
      FlashMessagesService.showError('Seed phrase is invalid');
    }

    onChange(match);
  };

  selectItem(item, index) {
    const {inputPhrases} = this.state;
    const emptyInputPhrase = inputPhrases.find(
      (phrase) => Object.keys(phrase).length === 0,
    );
    const emptyInputPhraseIndex = inputPhrases.indexOf(emptyInputPhrase);
    inputPhrases[emptyInputPhraseIndex] = {
      phrase: item,
      index,
    };
    this.setState({inputPhrases}, () => this.onChange());
  }

  deselectItem(index) {
    const {inputPhrases} = this.state;
    inputPhrases[index] = {};
    this.setState({inputPhrases}, () => this.onChange());
  }

  renderPhrase(item, index) {
    const {inputPhrases} = this.state;
    const inputPhrase = inputPhrases.find((phrase) => phrase.index === index);
    const disabled = !!inputPhrase;

    return (
      <PhraseContainer
        disabled={disabled}
        onPress={() => this.selectItem(item, index)}>
        <PhraseText>{disabled ? index + 1 : item}</PhraseText>
      </PhraseContainer>
    );
  }

  renderInputPhrase(item, index) {
    const disabled = Object.keys(item).length === 0;

    return (
      <PhraseContainer
        disabled={disabled}
        onPress={() => this.deselectItem(index)}>
        <PhraseText>{disabled ? index + 1 : item.phrase}</PhraseText>
      </PhraseContainer>
    );
  }

  renderPhrases() {
    const {randomRecoveryPhrases} = this.state;

    return (
      <FlatList
        numColumns={3}
        data={randomRecoveryPhrases}
        renderItem={({item, index}) => this.renderPhrase(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  renderInputPhrases() {
    const {inputPhrases} = this.state;

    return (
      <FlatList
        numColumns={3}
        data={inputPhrases}
        renderItem={({item, index}) => this.renderInputPhrase(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  render() {
    const {style} = this.props;

    return (
      <Container style={style}>
        {this.renderPhrases()}
        <Separator />
        {this.renderInputPhrases()}
      </Container>
    );
  }
}

ConfirmSeed.propTypes = {
  style: ViewPropTypes.style,
  getRecoveryPhrase: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  recoveryPhrase: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ConfirmSeed.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {nem} = state;
  const {recoveryPhrase} = nem;
  return {recoveryPhrase};
}

export default connect(mapStateToProps, {
  getRecoveryPhrase: actions.getRecoveryPhrase,
})(ConfirmSeed);
