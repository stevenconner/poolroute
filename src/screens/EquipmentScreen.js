import React from 'react';

import { View, Text } from 'react-native';

class EquipmentScreen extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>This is the equipment screen</Text>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
    }
}

export default EquipmentScreen;