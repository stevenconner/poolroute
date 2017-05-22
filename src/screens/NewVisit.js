import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { View, Text, Modal, FlatList, Alert } from 'react-native';
import SuppliesItem from '../components/SuppliesItem';
import { Header, Button } from '../components/common';

class NewVisit extends React.Component {
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    renderModalItem(item) {
        return <SuppliesItem item={item} onPress={() => this.rowPress(item)} />
    }

    _keyExtractor = (item, index) => item.uid;

    rowPress(item) {
        let client = this.props.navigation.state.params.item;
        console.log('this is the client', client);
        Alert.alert(
            'Assigning Equipment',
            `Are you sure you want to assign ${item.name} to ${client.name}?`,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed!') },
                {
                    text: 'Yes', onPress: () => {
                        console.log('Yes pressed!');
                }}
            ]
        )
    }

    render() {
        console.log('here is newvisit props', this.props);
        let { item } = this.props.navigation.state.params;
        return (
            <View style={styles.containerStyle}>
                <Header 
                    leftText={'Back'}
                    leftPress={() => this.props.navigation.goBack()}
                    centerText={'New Visit'}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.textStyle}>New Visit for {item.name}</Text>
                    <Button 
                    onPress={() => this.setModalVisible(true)}
                    style={{ marginTop: 15 }}>Add Supplies</Button>
                </View>
                <Modal
                        animationType={'fade'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => console.log('modal closed')}
                    >
                        <View style={styles.modalStyle}>
                            <Text>Choose Supplies</Text>
                            <FlatList
                                style={{ width: '100%' }}
                                data={this.props.suppliesList}
                                renderItem={({ item }) => this.renderModalItem(item)}
                                keyExtractor={this._keyExtractor}
                                removeClippedSubviews={false}
                            />
                            <Button onPress={() => this.setModalVisible(false)}>Close</Button>
                        </View>
                    </Modal>
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
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
    },
    modalStyle: {
        borderColor: '#676769',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: '50%',
        backgroundColor: '#fff',
        height: '50%',
        width: '95%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

const mapStateToProps = state => {
    const { root, selectedClient } = state.data;

    let suppliesList = _.map(root.supplies, (val, uid) => {
            return { ...val, uid }
        })
        suppliesList.sort(function (a, b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })

    return { root, suppliesList };
}

export default connect(mapStateToProps)(NewVisit);