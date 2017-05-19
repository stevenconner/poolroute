import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ClientList from '../screens/ClientList';
import DayScreen from '../screens/DayScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewEquipmentScreen from '../screens/NewEquipmentScreen';
import EquipmentDetails from '../screens/EquipmentDetails';
import NewClientScreen from '../screens/NewClientScreen';
import ClientDetails from '../screens/ClientDetails';

const TodayStack = StackNavigator({
    TodayScreen: {
        screen: DayScreen,
    },
    TodayClientDetails: {
        screen: ClientDetails,
    }
}, {
        initialRouteName: 'TodayScreen',
        mode: 'card',
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
})

const ClientStack = StackNavigator({
    ClientList: {
        screen: ClientList,
    },
    NewClientScreen: {
        screen: NewClientScreen,
    },
    ClientDetails: {
        screen: ClientDetails,
    },
    ClientEquipmentDetails: {
        screen: EquipmentDetails,
    }
    }, {
        initialRouteName: 'ClientList',
        mode: 'card',
        cardStyle: { shadowColor: 'transparent' },
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: 'Clients',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='view-list'
                    type='material-community'
                    color={tintColor}
                    size={35}
                />
            ),
            header: null,
        }
    })

const EquipmentStack = StackNavigator({
    EquipmentScreen: {
        screen: EquipmentScreen,
    },
    NewEquipmentScreen: {
        screen: NewEquipmentScreen,
    },
    EquipmentDetails: {
        screen: EquipmentDetails,
    }
    }, {
        initialRouteName: 'EquipmentScreen',
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: 'Supplies',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='beaker'
                    type='material-community'
                    color={tintColor}
                    size={30}
                />
            ),
            header: null,
        }
    })

const TabsNavigator = TabNavigator({
    DayScreen: {
        screen: TodayStack,
    },
    Clients: {
        screen: ClientStack,
    },
    Equipment: {
        screen: EquipmentStack,
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
        tabBarPosition: 'bottom',
        lazy: true,
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