import React from 'react';

import { View, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { Button } from './common';

class DayItem extends React.Component {

    handleDirectionsPress() {
        let { address } = this.props.item;
        let newAddress = address.replace(/ /g, '+');
        let currentLocation = navigator.geolocation.getCurrentPosition((response) => {
            let url = `http://maps.apple.com/?saddr=${response.coords.latitude},${response.coords.longitude}&daddr=${newAddress}&dirflg=d`
            console.log('here is url', url);
            Linking.openURL(url);
        })
    }

    render() {
        let { name, address, city, state, phone, type } = this.props.item;

        return (
            <TouchableWithoutFeedback style={styles.touchableStyle} onPress={this.props.onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{name}</Text>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => this.handleDirectionsPress()}>Directions</Button>
                        <Button>New Visit</Button>
                        <Button
                            style={{ borderColor: '#a00' }}
                            textStyle={{ color: '#a00' }}
                        >
                            Remove
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    touchableStyle: {

    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
    },
    textStyle: {
        fontSize: 28,
        paddingTop: 10,

    },
    buttonContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
}

export default DayItem;