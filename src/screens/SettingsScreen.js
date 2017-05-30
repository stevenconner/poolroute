import React from 'react';
import { connect } from 'react-redux';
import { logOut, updateEndingLocation } from '../actions';
import { NavigationActions } from 'react-navigation';

import { View, Text, TextInput } from 'react-native';
import { Button } from '../components/common';

class SettingsScreen extends React.Component {
    state = {
        endingLocation: '',
    }
    
    handleLogOut() {
        this.props.logOut();
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    handleUpdatePress() {
        if (this.state.endingLocation) {
            this.props.updateEndingLocation(this.state.endingLocation);
        }
    }

    isEmpty(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={{ fontSize: 18 }}>Route Ending Location:</Text>
                <Text style={{ fontSize: 18 }}>{this.props.root.userInfo.endingLocation}</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => this.setState({ endingLocation: text })}
                    value={this.state.endingLocation}
                    placeholder={'1010 Fake Ave, Faketown, CA'}
                    autoCorrect={false}
                    autoCapitalize={'words'}
                />
                <Button onPress={() => this.handleUpdatePress()}>Update</Button>
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
    },
    textInputStyle: {
        height: 38,
        width: '75%',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 20,
        padding: 5,
    }
}

const mapStateToProps = state => {
    const { root } = state.data;
    console.log('this is root', root);
    return { root };
}

export default connect(mapStateToProps, { logOut, updateEndingLocation })(SettingsScreen);