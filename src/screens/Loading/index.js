import React from 'react';
import * as PropTypes from 'prop-types';
import {Splash} from 'components';
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import {NAVIGATORS, SCREENS} from 'navigation';
import {connect} from 'react-redux';
import autoBind from 'auto-bind';
import {Linking} from 'react-native';
import {FlashMessagesService, GeensService} from 'services';
import {backup as actions} from 'actions';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const {
      isWalkthroughComplete,
      navigation,
      isCompleted,
      getAccessToken,
    } = this.props;

    Linking.getInitialURL()
      .then((url) => {
        if (url && !isCompleted) {
          const code = GeensService.parseCode(url);
          getAccessToken(code, () => {
            navigation.navigate(NAVIGATORS.MAIN, {
              screen: NAVIGATORS.SETTINGS,
              params: {
                screen: SCREENS.GEENS_SUCCESS,
              },
            });
          });
        }
      })
      .catch(() => FlashMessagesService.showGenericError());

    if (!isWalkthroughComplete) {
      navigation.replace(SCREENS.WALKTHROUGH);
      return;
    }

    hasUserSetPinCode().then((value) => {
      navigation.replace(value ? SCREENS.VERIFY_PIN_CODE : NAVIGATORS.MAIN);
    });
  }

  render() {
    return <Splash />;
  }
}

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  isWalkthroughComplete: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  getAccessToken: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {app, backup} = state;
  const {isWalkthroughComplete} = app;
  const {isCompleted} = backup;
  return {isWalkthroughComplete, isCompleted};
}

export default connect(mapStateToProps, {
  getAccessToken: actions.getAccessToken,
})(LoadingScreen);
