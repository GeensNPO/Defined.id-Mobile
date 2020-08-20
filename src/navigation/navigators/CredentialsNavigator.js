import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  CredentialDetailsScreen,
  CredentialReviewScreen,
  CredentialsScreen,
  NewCredentialScreen,
  VerifyCredentialScreen,
  VerifyCredentialSuccessScreen,
} from 'screens';
import {SCREENS} from '../constants';
import {HEADER_OPTIONS} from '../config';

const CredentialsStack = createStackNavigator();

const screenOptions = {
  ...HEADER_OPTIONS,
};

export default function CredentialsNavigator() {
  return (
    <CredentialsStack.Navigator screenOptions={screenOptions}>
      <CredentialsStack.Screen
        name={SCREENS.CREDENTIALS}
        component={CredentialsScreen}
        options={{title: 'Credentials', headerShown: false}}
      />
      <CredentialsStack.Screen
        name={SCREENS.NEW_CREDENTIAL}
        component={NewCredentialScreen}
        options={{title: 'New Credential'}}
      />
      <CredentialsStack.Screen
        name={SCREENS.CREDENTIAL_REVIEW}
        component={CredentialReviewScreen}
        options={{title: 'Credential Review'}}
      />
      <CredentialsStack.Screen
        name={SCREENS.VERIFY_CREDENTIAL_SUCCESS}
        component={VerifyCredentialSuccessScreen}
        options={{headerShown: false}}
      />
      <CredentialsStack.Screen
        name={SCREENS.VERIFY_CREDENTIAL}
        component={VerifyCredentialScreen}
        options={{title: 'Verify Credential'}}
      />
      <CredentialsStack.Screen
        name={SCREENS.CREDENTIAL_DETAILS}
        component={CredentialDetailsScreen}
        options={{title: 'Credential Details'}}
      />
    </CredentialsStack.Navigator>
  );
}
