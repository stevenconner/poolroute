import React from 'react';

import { View, Text, TouchableWithoutFeedback } from 'react-native';

class SuppliesItem extends React.Component {
    render() {
        let { name, description, cost, price } = this.props.item;

        return (
            <TouchableWithoutFeedback style={styles.touchableStyle} onPress={this.props.onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    touchableStyle: {

    },
    viewStyle: {
        height: 30,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18,
    }
}

export default SuppliesItem;