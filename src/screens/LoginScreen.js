import React from 'react';
import { connect } from 'react-redux';
import { loginUserWithEmail, watchUserData } from '../actions';
import firebase from 'firebase';

import { View, Text, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native';
import { Button } from '../components/common';
import t from 'tcomb-form-native';

// variables for setting up form
var Form = t.form.Form;
var Login = t.struct({
    email: t.String,
    password: t.String,
})
var options = {
    fields: {
        email: {
            keyboardType: 'email-address',
            autoCorrect: false,
        },
        password: {
            password: true,
            secureTextEntry: true,
        }
    }
}

class LoginScreen extends React.Component {
    state = {
        value: {},
        behavior: 'padding',
        loggedIn: false,
        showForm: false,
    }

    handleLoginPress() {
        var value = this.refs.form.getValue();
        Keyboard.dismiss();
        if (value) {
            this.props.loginUserWithEmail(value);
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <ActivityIndicator size={'large'} />
        }
        return (
            <Button onPress={() => this.handleLoginPress()}>Log In</Button>
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <KeyboardAvoidingView style={styles.kbAvoidingStyle}>
                    <Text style={styles.logoStyle}>Pool Route Pro</Text>
                    <Form
                        ref='form'
                        type={Login}
                        value={this.state.value}
                        options={options}
                    />
                    <Text style={styles.errorText}>{this.props.error}</Text>
                    {this.renderButton()}
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    kbAvoidingStyle: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    logoStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 20,
        color: '#007aff',
    },
    errorText: {
        alignSelf: 'center',
        marginVertical: 5,
        color: '#aa0000'
    }
}

const mapStateToProps = state => {
    const { error, loading } = state.auth;
    return { error, loading };
}

export default connect(mapStateToProps, { loginUserWithEmail, watchUserData })(LoginScreen);
