import React from 'react';

import { View, Text } from 'react-native';
import { Header } from '../components/common';

class NewVisit extends React.Component {
    render() {
        console.log('here is newvisit props', this.props);
        return (
            <View style={styles.containerStyle}>
                <Header 
                    leftText={'Back'}
                    leftPress={() => this.props.navigation.goBack()}
                    centerText={'New Visit'}
                />
                <View style={styles.contentContainer}>
                    <Text>This is the New visit screen</Text>
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
        paddingTop: 10,
    }
}

export default NewVisit;