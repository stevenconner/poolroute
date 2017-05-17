import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View, Text, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { Header } from '../components/common';
import SuppliesItem from '../components/SuppliesItem';

class EquipmentScreen extends React.Component {

    renderItem(item) {
        return <SuppliesItem item={item} onPress={() => this.props.navigation.navigate('EquipmentDetails', { item: item })} />
    }

    renderHeader(item) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#007aff', opacity: 0.7 }}>
                <Text style={styles.sectionHeaderStyle}>{item.section.key}</Text>
            </View>
        )
    }

    _keyExtractor = (item, index) => item.uid;

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Supplies'}
                    rightPress={() => this.props.navigation.navigate('NewEquipmentScreen')}
                    rightText={'New'}
                />
                <View style={styles.contentContainer}>
                    <SectionList
                        renderItem={({ item }) => this.renderItem(item)}
                        renderSectionHeader={this.renderHeader}
                        sections={this.props.suppliesList}
                        keyExtractor={this._keyExtractor}
                        removeClippedSubviews={false}
                        initialListSize={20}
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
        paddingTop: 5
    },
    sectionHeaderStyle: {
        paddingLeft: 10,
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#007aff',
        fontWeight: '500',
    }
}

const mapStateToProps = state => {
    const { root } = state.data;
    let suppliesList = _.map(root.supplies, (val, uid) => {
        return { ...val, uid }
    })
    suppliesList.sort(function (a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    suppliesList = _.groupBy(suppliesList, d => d.name[0])

    suppliesList = _.reduce(suppliesList, (acc, next, index) => {
        acc.push({
            key: index,
            data: next
        })
        return acc
    }, [])
    return { root, suppliesList };
}

export default connect(mapStateToProps)(EquipmentScreen);