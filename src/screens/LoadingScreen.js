import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { watchUserData } from '../actions';

import { ActivityIndicator, View } from 'react-native';

class LoadingScreen extends React.Component {
    state = {
        loggedIn: false,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && !this.state.loggedIn) {
                console.log('user is logging in!', this.props)
                this.setState({ loggedIn: true });
                this.props.watchUserData(this.props.navigation, 'Tabs');
            } else {
                console.log('user is logging out!');
                this.setState({ loggedIn: false })
            }
        })

        setTimeout(
            () => {
                if (this.state.loggedIn == false) {
                    this.props.navigation.navigate('LoginScreen');
                }
            },
            1500
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default connect(null, { watchUserData })(LoadingScreen);