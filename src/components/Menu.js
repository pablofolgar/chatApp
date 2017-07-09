import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const style = require('./styles.js');
class Menu extends React.Component{
    state={
        name:this.props.name,
    };

    render(){
        return(
            <View style={style.container}>
                <FlatList

                    data={[
                    {key: 'Catalogo'},
                    {key: 'Comunicacion'},
                    {key: 'Eventos'},
                    {key: 'Perfil'},
                    ]}

                    renderItem={
                        ({item}) =>
                        <Text style={style.item}
                        onPress={() =>{
                            switch(item.key){
                                case 'Comunicacion':
                                    Actions.comunicacion({name:this.state.name,});
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

export default Menu;