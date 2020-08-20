import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AccountSettingsScreen,
  AddressScreen,
  AppSettingsScreen,
  BackupSettingsScreen,
  BirthDateScreen,
  ConfirmSeedScreen,
  DrivingLicenseScreen,
  EmailScreen,
  GeensSuccessScreen,
  IdentityDocumentsScreen,
  NameAndSurnameScreen,
  NationalIdScreen,
  PassportScreen,
  PhoneScreen,
  RecoveryPhraseScreen, SendXymScreen,
  SetPinCodeScreen,
  SettingsScreen,
  WalletRecoveryScreen,
  WalletRecoverySuccessScreen,
  WalletScreen, WalletSettingsScreen,
  WalletSetupScreen,
  WalletSetupSuccessScreen,
} from 'screens';
import {SCREENS} from '../constants';
import {HEADER_OPTIONS} from '../config';

const SettingsStack = createStackNavigator();

const screenOptions = {
  ...HEADER_OPTIONS,
};

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <SettingsStack.Screen
        name={SCREENS.ACCOUNT_SETTINGS}
        component={AccountSettingsScreen}
        options={{title: 'Account settings'}}
      />
      <SettingsStack.Screen
        name={SCREENS.NAME_AND_SURNAME}
        component={NameAndSurnameScreen}
        options={{title: 'Name and Surname'}}
      />
      <SettingsStack.Screen
        name={SCREENS.ADDRESS}
        component={AddressScreen}
        options={{title: 'Address'}}
      />
      <SettingsStack.Screen
        name={SCREENS.EMAIL}
        component={EmailScreen}
        options={{title: 'Email'}}
      />
      <SettingsStack.Screen
        name={SCREENS.PHONE}
        component={PhoneScreen}
        options={{title: 'Phone number'}}
      />
      <SettingsStack.Screen
        name={SCREENS.BIRTH_DATE}
        component={BirthDateScreen}
        options={{title: 'Birth date'}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET_SETUP}
        component={WalletSetupScreen}
        options={{title: 'Wallet setup'}}
      />
      <SettingsStack.Screen
        name={SCREENS.RECOVERY_PHRASE}
        component={RecoveryPhraseScreen}
        options={{title: 'Wallet setup'}}
      />
      <SettingsStack.Screen
        name={SCREENS.CONFIRM_SEED}
        component={ConfirmSeedScreen}
        options={{title: 'Wallet setup'}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET_SETUP_SUCCESS}
        component={WalletSetupSuccessScreen}
        options={{headerShown: false}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET_RECOVERY}
        component={WalletRecoveryScreen}
        options={{title: 'Wallet recovery'}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET_RECOVERY_SUCCESS}
        component={WalletRecoverySuccessScreen}
        options={{headerShown: false}}
      />
      <SettingsStack.Screen
        name={SCREENS.BACKUP_SETTINGS}
        component={BackupSettingsScreen}
        options={{title: 'Backup settings'}}
      />
      <SettingsStack.Screen
        name={SCREENS.GEENS_SUCCESS}
        component={GeensSuccessScreen}
        options={{headerShown: false}}
      />
      <SettingsStack.Screen
        name={SCREENS.IDENTITY_DOCUMENTS}
        component={IdentityDocumentsScreen}
        options={{title: 'Identity documents'}}
      />
      <SettingsStack.Screen
        name={SCREENS.PASSPORT}
        component={PassportScreen}
        options={{title: 'Passport'}}
      />
      <SettingsStack.Screen
        name={SCREENS.DRIVING_LICENSE}
        component={DrivingLicenseScreen}
        options={{title: 'Driving license'}}
      />
      <SettingsStack.Screen
        name={SCREENS.NATIONAL_ID}
        component={NationalIdScreen}
        options={{title: 'National ID'}}
      />
      <SettingsStack.Screen
        name={SCREENS.APP_SETTINGS}
        component={AppSettingsScreen}
        options={{title: 'App settings'}}
      />
      <SettingsStack.Screen
        name={SCREENS.SET_PIN_CODE}
        component={SetPinCodeScreen}
        options={{title: 'Set pin code'}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET}
        component={WalletScreen}
        options={{title: 'Wallet'}}
      />
      <SettingsStack.Screen
        name={SCREENS.WALLET_SETTINGS}
        component={WalletSettingsScreen}
        options={{title: 'Wallet settings'}}
      />
      <SettingsStack.Screen
        name={SCREENS.SEND_XYM}
        component={SendXymScreen}
        options={{title: 'Send XYM'}}
      />
    </SettingsStack.Navigator>
  );
}
