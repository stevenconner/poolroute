import React from 'react';
import { connect } from 'react-redux';
import { makeDay } from '../actions';
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
            // Map the clients to an object
            clientList = _.map(root.clients, (val, uid) => {
                return { ...val, uid }
            })
            // Splice the client out if their service day isn't today
            for (i = clientList.length - 1; i >= 0; i -= 1) {
                if (!matchDay(clientList[i].serviceDay)) {
                    clientList.splice(i, 1);
                }
            }
            // Sort through the clients and rearrange them alphabetically
            clientList.sort(function (a, b) {
                let textA = a.name.toUpperCase();
                let textB = a.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
    }
    console.log('root', root);
    console.log('clientList', clientList);

    return { root, clientList };
}

export default connect(mapStateToProps, { makeDay })(DayScreen);