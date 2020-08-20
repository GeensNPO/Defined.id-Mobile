import React, {Component} from 'react';
import {ViewPropTypes} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {nem as actions} from 'actions';
import {
  Container,
  IndexText,
  List,
  PhraseText,
  PhraseContainer,
  Footer,
  FooterText,
  FooterImage,
} from './styles';
import {IMAGES} from 'constants';

class RecoveryPhrase extends Component {
  componentDidMount() {
    const {getRecoveryPhrase} = this.props;
    getRecoveryPhrase();
  }

  renderPhrase = (phrase, index) => (
    <PhraseContainer>
      <IndexText>{`${index + 1}.`}</IndexText>
      <PhraseText>{phrase}</PhraseText>
    </PhraseContainer>
  );

  renderFooter = () => (
    <Footer>
      <FooterText>Write down Phrases on paper!</FooterText>
      <FooterImage source={IMAGES.CONNECTIONS_ACTIVE} />
    </Footer>
  );

  render() {
    const {style, recoveryPhrase, getRecoveryPhrase} = this.props;

    return (
      <Container style={style}>
        <List
          numColumns={2}
          refreshing={false}
          onRefresh={getRecoveryPhrase}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => this.renderPhrase(item, index)}
          data={recoveryPhrase}
        />
        {this.renderFooter()}
      </Container>
    );
  }
}

RecoveryPhrase.propTypes = {
  style: ViewPropTypes.style,
  getRecoveryPhrase: PropTypes.func.isRequired,
  recoveryPhrase: PropTypes.arrayOf(PropTypes.string).isRequired,
};

RecoveryPhrase.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  const {nem} = state;
  const {recoveryPhrase} = nem;
  return {recoveryPhrase};
}

export default connect(mapStateToProps, {
  getRecoveryPhrase: actions.getRecoveryPhrase,
})(RecoveryPhrase);
