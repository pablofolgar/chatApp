import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker
} from 'react-native';

const style = require('./../styles.js');

class CategoriasHistorias extends React.Component{
    state={
            categoria:'',
        };

    render(){
        return(
            <View>

                <Picker
                  selectedValue={this.state.categoria}
                  onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

            </View>
        );
    }
}

export default CategoriasHistorias;