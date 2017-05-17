import React from 'react';
import { connect } from 'react-redux';
import { updateClient } from '../actions';

import { View, Text, Alert, TextInput, Modal } from 'react-native';
import { Button, Header } from '../components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class ClientDetails extends React.Component {
    state = {
        modalVisible: false,
        editing: false,
        name: '',
        address: '',
        phone: '',
        accountType: '',
        error: '',
    }

    componentDidMount() {
        const { item } = this.props.navigation.state.params;
        this.setState({
            name: item.name,
            address: item.address,
            phone: item.phone,
            accountType: item.type,
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    handleSavePress() {
        let value = {
            type: this.state.accountType,
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
        }
        if (this.validation(value)) {
            this.props.updateClient(this.props.navigation.state.params.item.uid, value);
            this.props.navigation.goBack();
        }
    }

    validation(value) {
        if (value.name != '' && value.address != '' && value.phone != '' && value.accountType != 'Account Type') {
            return true;
        } else {
            this.setState({error: 'Please check entries and try again.'})
            return false;
        }
    }

    whichContent() {
        const { item } = this.props.navigation.state.params
        console.log('here is the item', item);
        if (this.state.editing) {
            return (
                <KeyboardAwareScrollView contentContainerStyle={[styles.contentContainer, { paddingTop: 30 }]}>
                    <Text style={styles.textInputTitle}>Name</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ name: text, error: '' })}
                        value={this.state.name}
                        placeholder={'Namey Fakerton'}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                    />
                    <Text style={styles.textInputTitle}>Phone Number</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ phone: text, error: '' })}
                        value={this.state.phone}
                        placeholder={'888-888-8888'}
                        keyboardType={'numeric'}
                    />
                    <Text style={styles.textInputTitle}>Address</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ address: text, error: '' })}
                        value={this.state.address}
                        placeholder={'1010 Fake Ave, Faketown, CA'}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                    />
                    <Menu onSelect={(value) => this.setState({ accountType: value })}>
                        <MenuTrigger style={styles.menuTriggerStyle}>
                            <Text style={{ fontSize: 18 }}>{this.state.accountType}</Text>
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ width: '95%' }} >
                            <MenuOption value={'Full Service'}>
                                <Text>Full Service</Text>
                            </MenuOption>
                            <MenuOption value={'Chemical +'}>
                                <Text>Chemical +</Text>
                            </MenuOption>
                            <MenuOption value={'Chemical Only'}>
                                <Text>Chemical Only</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Text style={styles.errorText}>{[this.props.error, this.state.error]}</Text>
                    <Button onPress={() => this.handleSavePress()}>Save</Button>
                </KeyboardAwareScrollView>
            )
        } else {
            return (
                <View style={[styles.contentContainer, { alignItems: 'center' }]}>
                    <Text style={styles.textStyle}>{item.name}</Text>
                    <Text style={styles.textStyle}>{item.address}</Text>
                    <Text style={styles.textStyle}>{item.phone}</Text>
                    <Text style={[styles.textStyle, { marginTop: 20 }]}>Account Type: {item.type}</Text>
                    <Button onPress={() => this.setModalVisible(true)} style={{ marginTop: 15 }}>Add Equipment</Button>
                    <Modal
                        animationType={'fade'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => console.log('modal closed')}
                    >
                        <View style={styles.modalStyle}>
                            <Text>Choose Equipment</Text>
                            <Button onPress={() => this.setModalVisible(false)}>Close</Button>
                        </View>
                    </Modal>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                    leftText={'Back'}
                    centerText={'Details'}
                    rightText={(this.state.editing) ? 'Cancel' : 'Edit'}
                    rightPress={() => this.setState({ editing: !this.state.editing })}
                />
                {this.whichContent()}
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    textStyle: {
        fontSize: 18,
    },
    errorText: {
        alignSelf: 'center',
        marginVertical: 5,
        color: '#aa0000'
    },
    menuTriggerStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        width: '50%',
        marginVertical: 10
    },
    textInputTitle: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: '400',
    },
    textInputStyle: {
        height: 38,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 5,
        padding: 5,
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
    const { root } = state.data;

    return { root };
}

export default connect(null, { updateClient })(ClientDetails);