import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IMAGES} from 'constants';
import {NAVIGATORS, SCREENS} from '../constants';
import {ScannerScreen} from 'screens';
import {Icon} from '../styles';
import {TAB_BAR_OPTIONS} from '../config';
import SettingsNavigator from './SettingsNavigator';
import CredentialsNavigator from './CredentialsNavigator';
import ConnectionsNavigator from './ConnectionsNavigator';

const Tab = createBottomTabNavigator();

const credentialsOptions = {
  tabBarIcon: ({focused}) => (
    <Icon source={focused ? IMAGES.MAIN_ACTIVE : IMAGES.MAIN} />
  ),
};

const settingsOption = {
  tabBarIcon: ({focused}) => (
    <Icon source={focused ? IMAGES.SETTINGS_ACTIVE : IMAGES.SETTINGS} />
  ),
};

const connectionsOption = {
  tabBarIcon: ({focused}) => (
    <Icon source={focused ? IMAGES.CONNECTIONS_ACTIVE : IMAGES.CONNECTIONS} />
  ),
};

const scannerOption = {
  tabBarIcon: ({focused}) => (
    <Icon source={focused ? IMAGES.QR_ACTIVE : IMAGES.QR} />
  ),
};

export default function MainNavigator() {
  return (
    <Tab.Navigator tabBarOptions={TAB_BAR_OPTIONS}>
      <Tab.Screen
        name={NAVIGATORS.CREDENTIALS}
        options={credentialsOptions}
        component={CredentialsNavigator}
      />
      <Tab.Screen
        name={NAVIGATORS.CONNECTIONS}
        options={connectionsOption}
        component={ConnectionsNavigator}
      />
      <Tab.Screen
        name={SCREENS.SCANNER}
        options={scannerOption}
        component={ScannerScreen}
      />
      <Tab.Screen
        name={NAVIGATORS.SETTINGS}
        options={settingsOption}
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
}
