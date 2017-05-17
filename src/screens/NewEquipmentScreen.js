import React from 'react';
import { connect } from 'react-redux';
import { saveNewItem } from '../actions';

import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Header } from '../components/common';
import t from 'tcomb-form-native';

var Form = t.form.Form;
var NewItem = t.struct({
    name: t.String,
    description: t.String,
    cost: t.Number,
    price: t.Number,
})
var options = {
    fields: {
        name: {
            autoCorrect: false,
        },
        cost: {
            keyboardType: 'numeric'
        },
        price: {
            keyboardType: 'numeric'
        }
    }
}

class NewEquipmentScreen extends React.Component {
    state = {
        value: {},
    }

    handleSavePress() {
        let value = this.refs.form.getValue();
        console.log('this is value', value);
        if (value) {
            this.props.saveNewItem(value);
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                    leftText={'Back'}
                    centerText={'New Item'}
                />
                <View style={styles.contentContainer}>
                    <Form
                        ref='form'
                        type={NewItem}
                        value={this.state.value}
                    />
                    <Text style={styles.errorText}>{this.props.error}</Text>
                    <Button onPress={() => this.handleSavePress()}>Save</Button>
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    errorText: {
        alignSelf: 'center',
        marginVertical: 5,
        color: '#aa0000'
    }
}

const mapStateToProps = state => {
    const { loading, error, confirm } = state.data;

    return { loading, error, confirm };
}

export default connect(mapStateToProps, { saveNewItem })(NewEquipmentScreen);