import React from 'react';
import { connect } from 'react-redux';
import { makeDay, updateQueue } from '../actions';
import _ from 'lodash';

import { View, Text, FlatList } from 'react-native';
import { Header } from '../components/common';
import ClientItem from '../components/ClientItem';

class DayScreen extends React.Component {

    renderItem(item) {
        return <ClientItem item={item} />
    }

    _keyExtractor = (item, index) => item.uid;

    renderList() {
        if (!this.isEmpty(this.props.clientList)) {
            return (
                <FlatList
                    style={{ width: '100%' }}
                    data={this.props.clientList}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this._keyExtractor}
                    removeClippedSubviews={false}
                />
            )
        }
    }

    isEmpty(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Today'}
                    rightText={'Route'}
                />
                <View style={styles.contentContainer}>
                    {this.renderList()}
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
        paddingTop: 15,
    }
}

function isEmpty(obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
}

function matchDay(dayOfWeek) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (days[new Date().getDay()] == dayOfWeek)
}

const mapStateToProps = state => {
    const { root } = state.data;
    var clientList = {};
    if (!root.day && !isEmpty(root)) {
        makeDay();
    } else if (!isEmpty(root)) {
        console.log('here it is');
        if (root.day.dayOfWeek != new Date().getDay()) {
            // Update the day in firebase
            // makeDay();
            // Map the clients to an object
            console.log('here is clientlist before mapping', root.clients);
            clientList = _.map(root.clients, (val, uid) => {
                return { ...val, uid }
            })
            console.log('clientlist after mapping', clientList);
            // Splice the client out if their service day isn't today
            for (i = clientList.length - 1; i >= 0; i -= 1) {
                if (!matchDay(clientList[i].serviceDay)) {
                    clientList.splice(i, 1);
                }
            }
            console.log('clientList after splicing', clientList);
            // Reduce the map to a pojo so we can add queue to it.
            let pojo = _.reduce(clientList, function (hash, value) {
                var key = value['uid']
                hash[key] = {
                    name: value['name'],
                    address: value['address'],
                    phone: value['phone'],
                    serviceDay: value['serviceDay'],
                    type: value['type'],
                }
                return hash;
            }, {});
            // Take whatever clients are still in queue and add them to list
            if (root.day.queue) {
                clientList = Object.assign(pojo, root.day.queue);
            }
            console.log('here is clientList after assigning queue', clientList);
            //updateQueue(pojo);
            clientList = _.map(root.clients, (val, uid) => {
                return { ...val, uid }
            })
            console.log('here is clientList after mapping again', clientList);
            // Sort through the clients and rearrange them alphabetically
            clientList.sort(function (a, b) {
                let textA = a.name.toUpperCase();
                let textB = a.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
    }

    return { root, clientList };
}

export default connect(mapStateToProps, { makeDay })(DayScreen);