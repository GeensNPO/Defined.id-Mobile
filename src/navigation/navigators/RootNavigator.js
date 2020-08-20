import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {NAVIGATORS, SCREENS} from '../constants';
import {LoadingScreen, VerifyPinCodeScreen, WalkthroughScreen} from 'screens';
import MainNavigator from './MainNavigator';
import {NavigationService} from 'services';

const RootStack = createStackNavigator();

const OPTIONS = {
  headerShown: false,
};

function RootNavigator() {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <RootStack.Navigator screenOptions={OPTIONS}>
        <RootStack.Screen name={SCREENS.LOADING} component={LoadingScreen} />
        <RootStack.Screen
          name={SCREENS.WALKTHROUGH}
          component={WalkthroughScreen}
        />
        <RootStack.Screen
          name={SCREENS.VERIFY_PIN_CODE}
          component={VerifyPinCodeScreen}
        />
        <RootStack.Screen name={NAVIGATORS.MAIN} component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
