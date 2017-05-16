import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

class EquipmentScreen extends React.Component {

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.headerStyle}>
                    <View style={{flex: 0.33}}>

                    </View>
                    <View style={{ flex: 0.33, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ paddingTop: 15, fontSize: 18, fontWeight: 'bold' }}>Supplies</Text>
                    </View>
                    <View style={{ flex: 0.33, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewEquipmentScreen')}>
                            <Text style={{ color: '#007aff', fontSize: 16, paddingTop: 15, paddingRight: 10 }}>New</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text>This is the equipment screen</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerStyle: {
        height: '10%',
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    contentContainer: {
        height: '90%',
        paddingHorizontal: 10,
    }
}

export default EquipmentScreen;