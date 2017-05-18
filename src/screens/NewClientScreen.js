import React from 'react';
import { connect } from 'react-redux';
import { saveNewClient } from '../actions';

import { View, Text, ScrollView, TextInput } from 'react-native';
import { Header, Button } from '../components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class NewClientScreen extends React.Component {
    state = {
        accountType: 'Account Type',
        serviceDay: 'Select Service Day',
        name: '',
        address: '',
        phone: '',
        error: '',
    }

    handleSavePress() {
        let value = {
            type: this.state.accountType,
            serviceDay: this.state.serviceDay,
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
        }
        if (this.validation(value)) {
            this.props.saveNewClient(value);
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

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                    leftText={'Back'}
                    centerText={'New Client'}
                />
                <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.textInputTitle}>Name</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ name: text, error: '' })}
                        value={this.state.textInput}
                        placeholder={'Namey Fakerton'}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                    />
                    <Text style={styles.textInputTitle}>Phone Number</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ phone: text, error: '' })}
                        value={this.state.textInput}
                        placeholder={'888-888-8888'}
                        keyboardType={'numeric'}
                    />
                    <Text style={styles.textInputTitle}>Address</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ address: text, error: '' })}
                        value={this.state.textInput}
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
                    <Menu onSelect={(value) => this.setState({ serviceDay: value })}>
                        <MenuTrigger style={styles.menuTriggerStyle}>
                            <Text style={{ fontSize: 18 }}>{this.state.serviceDay}</Text>
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ width: '95%' }} >
                            <MenuOption value={'Monday'}>
                                <Text>Monday</Text>
                            </MenuOption>
                            <MenuOption value={'Tuesday'}>
                                <Text>Tuesday</Text>
                            </MenuOption>
                            <MenuOption value={'Wednesday'}>
                                <Text>Wednesday</Text>
                            </MenuOption>
                            <MenuOption value={'Thursday'}>
                                <Text>Thursday</Text>
                            </MenuOption>
                            <MenuOption value={'Friday'}>
                                <Text>Friday</Text>
                            </MenuOption>
                            <MenuOption value={'Saturday'}>
                                <Text>Saturday</Text>
                            </MenuOption>
                            <MenuOption value={'Sunday'}>
                                <Text>Sunday</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Text style={styles.errorText}>{[this.props.error, this.state.error]}</Text>
                    <Button onPress={() => this.handleSavePress()}>Save</Button>
                </KeyboardAwareScrollView>
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
        paddingTop: 30,
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
    }
}

const mapStateToProps = state => {
    const { loading, error, confirm } = state.data;

    return { loading, error, confirm };
}

export default connect(mapStateToProps, { saveNewClient })(NewClientScreen);