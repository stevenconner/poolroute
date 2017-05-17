import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import { Header } from '../components/common';
import ClientItem from '../components/ClientItem';

class ClientList extends React.Component {
    renderItem(item) {
        return <ClientItem item={item} onPress={() => this.props.navigation.navigate('ClientDetails', { item: item })} />
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
                    centerText={'Client List'}
                    rightPress={() => this.props.navigation.navigate('NewClientScreen')}
                    rightText={'New'}
                />
                <View style={styles.contentContainer}>
                    <SectionList
                        renderItem={({ item }) => this.renderItem(item)}
                        renderSectionHeader={this.renderHeader}
                        sections={this.props.clientList}
                        keyExtractor={this._keyExtractor}
                        removeClippedSubviews={false}
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
        paddingTop: 5,
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
    let clientList = _.map(root.clients, (val, uid) => {
        return { ...val, uid }
    })
    clientList.sort(function (a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    clientList = _.groupBy(clientList, d => d.name[0])
    clientList = _.reduce(clientList, (acc, next, index) => {
        acc.push({
            key: index,
            data: next
        })
        return acc
    }, [])
    return { root, clientList };
}

export default connect(mapStateToProps)(ClientList);