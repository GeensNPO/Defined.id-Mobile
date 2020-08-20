import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  ConnectionDetailsScreen,
  ConnectionsScreen,
  ConnectionSuccessScreen,
} from 'screens';
import {SCREENS} from '../constants';
import {HEADER_OPTIONS} from '../config';

const CredentialsStack = createStackNavigator();

const screenOptions = {
  ...HEADER_OPTIONS,
};

export default function ConnectionsNavigator() {
  return (
    <CredentialsStack.Navigator screenOptions={screenOptions}>
      <CredentialsStack.Screen
        name={SCREENS.CONNECTIONS}
        component={ConnectionsScreen}
        options={{title: 'Connections', headerShown: false}}
      />
      <CredentialsStack.Screen
        name={SCREENS.CONNECTION_DETAILS}
        component={ConnectionDetailsScreen}
        options={{title: 'Connection details'}}
      />
      <CredentialsStack.Screen
        name={SCREENS.CONNECTION_SUCCESS}
        component={ConnectionSuccessScreen}
        options={{headerShown: false}}
      />
    </CredentialsStack.Navigator>
  );
}
