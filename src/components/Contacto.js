import React from 'react';

import {
    Actions,
} from 'react-native-router-flux';

import {FlatList, StyleSheet, Text, View} from 'react-native';
const style = require('./styles.js');

class Contacto extends React.Component{
    state={
        user:this.props.user,
    };

    render(){
            return(
                <View style={style.container}>
                    <FlatList

                        data={[
                        {key: 'Carla'},
                        {key: 'Gabriel'},
                        {key: 'Matías'},
                        {key: 'Pablo'},
                        {key: 'Paula'},
                        ]}

                        renderItem={
                            ({item}) =>

                            <View style={style.ChatUserView}>
                                <Text style={style.ChatUserText}
                                onPress={() => {
                                Actions.chat({user:this.state.user,contacto:item.key});}}>
                                {item.key}
                                </Text>
                            </View>
                        }

                    />
                 </View>
            );
        }
}

export default Contacto;
