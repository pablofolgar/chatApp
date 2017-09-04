import React from 'react';

import {
    Actions,
} from 'react-native-router-flux';

import {FlatList, StyleSheet, Text, View} from 'react-native';
const style = require('./styles.js');

class Contacto extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View style={style.container}>
                    <FlatList

                        data={[
                        {key: 'Carla'},
                        {key: 'Gabriel'},
                        {key: 'Matias'},
                        {key: 'Pablo'},
                        {key: 'Paula'},
                        ]}

                        renderItem={
                            ({item}) =>
                            <Text style={style.item}
                            onPress={() => {
                                Actions.chat({name:this.state.name,contacto:item.key});}}>
                                {item.key}
                             </Text>
                        }

                    />
                 </View>
            );
        }
}

export default Contacto;
