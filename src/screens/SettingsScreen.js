import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions';
import { NavigationActions } from 'react-navigation';

import { View, Text } from 'react-native';
import { Button } from '../components/common';

class SettingsScreen extends React.Component {
    handleLogOut() {
        this.props.logOut();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>This is the settings screen</Text>
                <Button
                    style={{ borderColor: '#a00', marginTop: 20 }}
                    textStyle={{ color: '#a00' }}
                    onPress={() => this.handleLogOut()}
                >
                    Log Out
                </Button>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default connect(null, { logOut })(SettingsScreen);