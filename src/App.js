import React from 'react';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Routes } from './nav/Router';
import getStore from './state/Store';
import firebase from 'firebase';

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { View, Text, BackAndroid } from 'react-native';

const AppNavigator = StackNavigator(Routes, {
    initialRouteName: 'LoadingScreen',
    headerMode: 'screen',
    mode: 'card',
    navigationOptions: {
        gesturesEnabled: false,
    }
})

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}

@connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends React.Component {
    state = {
        loggedIn: false,
    }

    handleBackPress = () => {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
        })
        console.log('navigationindex', navigation.state)
        if (navigation.state.index === 1) return true;
        navigation.goBack();
        return true;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    
    componentWillMount() {
        this.firebaseConfig();
    }

    firebaseConfig() {
        const config = {
            apiKey: "AIzaSyCAoyv_Ciik-QwosNaR84w9fHDkss3aijU",
            authDomain: "poolroute-6575e.firebaseapp.com",
            databaseURL: "https://poolroute-6575e.firebaseio.com",
            projectId: "poolroute-6575e",
            storageBucket: "poolroute-6575e.appspot.com",
            messagingSenderId: "523150456155"
        };
        if (!firebase.apps.length) { firebase.initializeApp(config); }
    }

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        )
    }
}

const store = getStore(navReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MenuContext style={{ flex: 1 }}>
                    <AppWithNavigationState />
                </MenuContext>
            </Provider>
        )
    }
}

export default App;
