import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');

class Comunicacion extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
            return(
                <View style={style.container}>
                    <FlatList

                        data={[
                        {key: 'Chat'},
                        {key: 'Historias'},
                        ]}

                        renderItem={
                            ({item}) =>
                            <Text style={style.item}
                            onPress={() =>{
                            switch(item.key){
                                case 'Chat':
                                    Actions.contacto({name:this.state.name,});
                                    break;
                                case 'Historias':
                                    Actions.historias({name:this.state.name,});
                                    break;
                                default:
                                    alert("El menu "+item.key+" no esta disponible");
                                }
                            }}
                            >
                                {item.key}
                             </Text>
                        }

                    />
                 </View>
            );
        }
}

export default Comunicacion;
