import React from 'react';
import { connect } from 'react-redux';
import { deleteItem, updateItem } from '../actions';

import { View, Text, Alert } from 'react-native';
import { Button, Header } from '../components/common';
import t from 'tcomb-form-native';

var Form = t.form.Form;
var Edit = t.struct({
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
            keyboardType: 'numeric',
        },
        price: {
            keyboardType: 'numeric',
        }
    }
}

class EquipmentDetails extends React.Component {
    state = {
        editing: false,
        value: {},
    }

    handleSavePress(uid) {
        let value = this.refs.form.getValue();
        console.log('this is value', value);
        if (value) {
            this.props.updateItem(uid, value);
            this.props.navigation.goBack();
        }
    }

    handleDeletePress(uid) {
        Alert.alert(
            'DELETING ITEM',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                {
                    text: 'DELETE', onPress: () => {
                        this.props.deleteItem(uid)
                        this.props.navigation.goBack();
                } }
            ]
        )
    }

    whichContent() {
        const { item } = this.props.navigation.state.params
        console.log('here is the item', item);
        if (this.state.editing) {
            return (
                <View style={styles.contentContainer}>
                    <Form
                        ref='form'
                        type={Edit}
                        value={{
                            name: item.name,
                            description: item.description,
                            cost: item.cost,
                            price: item.price,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => this.handleSavePress(item.uid)}>Save</Button>
                        <Button
                            style={{ backgroundColor: '#a00', borderColor: '#a00' }}
                            textStyle={{ color: '#fff' }}
                            onPress={() => this.handleDeletePress(item.uid)}
                        >
                            DELETE
                        </Button>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.contentContainer, { alignItems: 'center' }]}>
                    <Text style={styles.textStyle}>Name: {item.name}</Text>
                    <Text style={styles.textStyle}>Description: {item.description}</Text>
                    <Text style={styles.textStyle}>Cost: {item.cost}</Text>
                    <Text style={styles.textStyle}>Price: {item.price}</Text>
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
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
}

export default connect(null, { deleteItem, updateItem })(EquipmentDetails);