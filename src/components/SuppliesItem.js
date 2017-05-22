import React from 'react';

import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Button } from './common';

class SuppliesItem extends React.Component {
    renderRemove() {
        if (this.props.newVisit) {
            return (
                <Button
                    style={{ borderColor: '#a00' }}
                    textStyle={{ color: '#a00' }}
                    onPress={() => this.props.removePress}
                >Remove</Button>
            )
        }
    }

    render() {
        let { name, description, cost, price } = this.props.item;

        return (
            <TouchableWithoutFeedback style={styles.touchableStyle} onPress={this.props.onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{name}</Text>
                    {this.renderRemove()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    touchableStyle: {

    },
    viewStyle: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
    },
    textStyle: {
        fontSize: 20,
    }
}

export default SuppliesItem;