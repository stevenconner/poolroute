import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ClientList from '../screens/ClientList';
import DayScreen from '../screens/DayScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TabsNavigator = TabNavigator({
    DayScreen: {
        screen: DayScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: 'Today',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='calendar-today'
                    type='material-community'
                    color={tintColor}
                    size={30}
                />
            )
        }
    },
    ClientList: {
        screen: ClientList,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: 'Clients',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='view-list'
                    type='material-community'
                    color={tintColor}
                    size={35}
                />
            )
        }
    },
    EquipmentScreen: {
        screen: EquipmentScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: 'Supplies',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='beaker'
                    type='material-community'
                    color={tintColor}
                    size={30}
                />
            )
        }
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='settings'
                    type='material-community'
                    color={tintColor}
                    size={30}
                />
            )
        }
    }
    }, {
        initialRouteName: 'DayScreen',
    });

export const Routes = {
    LoadingScreen: {
        screen: LoadingScreen,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    },
    Tabs: {
        screen: TabsNavigator,
    }
}
