import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Header } from '../components/common';
import SuppliesItem from '../components/SuppliesItem';

class EquipmentScreen extends React.Component {

    renderItem(item) {
        return <SuppliesItem item={item} onPress={() => this.props.navigation.navigate('EquipmentDetails', { item: item })} />
    }

    _keyExtractor = (item, index) => item.uid;

    render() {
        console.log('here is data', this.props)
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Supplies'}
                    rightPress={() => this.props.navigation.navigate('NewEquipmentScreen')}
                    rightText={'New'}
                />
                <View style={styles.contentContainer}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.suppliesList}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this._keyExtractor}
                    />
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
    contentContainer: {
        height: '90%',
        paddingHorizontal: 10,
        paddingTop: 5
    }
}

const mapStateToProps = state => {
    const { root } = state.data;
    const suppliesList = _.map(root.supplies, (val, uid) => {
        return { ...val, uid }
    })
    return { root, suppliesList };
}

export default connect(mapStateToProps)(EquipmentScreen);