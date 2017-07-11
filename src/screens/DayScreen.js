import React from 'react';
import { connect } from 'react-redux';
import { makeDay, updateQueue, selectClient, removeFromQueue } from '../actions';
import _ from 'lodash';
import { Location, Permissions } from 'expo';

import { View, Text, FlatList, Linking } from 'react-native';
import { Header } from '../components/common';
import DayItem from '../components/DayItem';

class DayScreen extends React.Component {
    state = {
        optimizedRoute: '',
        location: null,
        errorMessage: '',
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    renderItem(item) {
        return <DayItem 
        item={item} 
        onPress={() => {
            this.props.selectClient(item.uid);
            this.props.navigation.navigate('TodayClientDetails', { item: item })
        }} 
        onRemove={() => this.props.removeFromQueue(item.uid)}
        onNewVisit={() => {
            this.props.selectClient(item.uid);
            this.props.navigation.navigate('TodayNewVisit', { item: item })}}
        />
    }

    doRoute() {
        var addressesString = '';
        var route;
        for (i = 0; i < this.props.clientList.length; i++) {
            addressesString = addressesString + '|' + this.props.clientList[i].address;
        }
        let newAddress = addressesString.replace(/ /g, '+');
        let googleResponse = fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&destination=${this.props.root.userInfo.endingLocation}&waypoints=optimize:true${newAddress}`)
            .then((response) => {
                console.log('here is response', response);
                response.json().then((responseJson) => {
                    route = responseJson.routes[0].waypoint_order;
                    console.log('this is the route', route);
                    console.log('this is clientList', this.props.clientList);
                    let optimizedList = [];
                    for (i = 0; i < route.length; i++) {
                        let index = route[i];
                        console.log('here is the match', this.props.clientList[index]);
                        optimizedList.push(this.props.clientList[index]);
                    }
                    console.log('here is optimizedList', optimizedList);
                    this.setState({ optimizedRoute: optimizedList });
                });
            }).catch((error) => console.warn('fetch error', error))
    }

    _keyExtractor = (item, index) => item.uid;

    renderList() {
        if (!this.isEmpty(this.props.clientList)) {
            return (
                <FlatList
                    style={{ width: '100%' }}
                    data={(this.state.optimizedRoute != '') ? this.state.optimizedRoute : this.props.clientList}
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
                    rightText={'Optimize'}
                    rightPress={() => this.doRoute()}
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
        if (root.day.dayOfWeek != new Date().getDay()) {
            // Update the day in firebase
            makeDay();
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
            updateQueue(pojo);
            clientList = _.map(clientList, (val, uid) => {
                return { ...val, uid }
            })
            // Sort through the clients and rearrange them alphabetically
            clientList.sort(function (a, b) {
                let textA = a.name.toUpperCase();
                let textB = a.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            // Map the clients to an object
            clientList = _.map(root.day.queue, (val, uid) => {
                return { ...val, uid }
            })
            // Sort through the clients an rearrange them alphabetically
            clientList.sort(function (a, b) {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
    }

    return { root, clientList };
}

export default connect(mapStateToProps, { makeDay, selectClient, removeFromQueue })(DayScreen);