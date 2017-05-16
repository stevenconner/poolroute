import React from 'react';
import { connect } from 'react-redux';
import { saveNewItem } from '../actions';

import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../components/common';
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
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.headerStyle}>
                    <View style={{ flex: 0.33, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: '#007aff', fontSize: 16, paddingTop: 15, paddingLeft: 10 }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.33, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ paddingTop: 15, fontSize: 18, fontWeight: 'bold' }}>New Item</Text>
                    </View>
                    <View style={{ flex: 0.33, alignItems: 'flex-end', justifyContent: 'center' }}>
                    </View>
                </View>
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
    headerStyle: {
        height: '10%',
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
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