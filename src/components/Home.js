import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');

class Home extends React.Component{
    state={
        name:'',
    };

    render(){
        return(
            <View>
                <Text style={style.title} >
                    Enter your name :
                </Text>

                <TextInput style={style.nameInput}
                placeholder='Pablo Folgar'
                onChangeText={ (text) => {
                    this.setState({
                        name:text,
                    })
                }}
                value= {this.state.name}

                />

                <TouchableOpacity>
                    <Text style={style.buttonText}
                    onPress={() => {
                        Actions.menu({
                            name:this.state.name,
                        });
                    }}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Home;