import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

/*var Fondo = require('./imagenes/huellas1.jpg');*/
const style = require('./styles.js');

class Home extends React.Component{
    state={
        name:'',
    };

    render(){
        return(
            <View style={style.container}>

{/*                <Image 
                style={ {flex:1, width: null, height: null, resizeMode: 'cover'} }
                source={Fondo}
                >*/}

                   {/*<Text style={style.title} >
                        ESCRIBA SU USUARIO:
                    </Text>*/} 

                    <TextInput style={style.nameInput}
                    placeholder='USUARIO'
                    onChangeText={ (text) => {
                        this.setState({
                            name:text,
                        })
                    }}
                    value= {this.state.name}

                    />


                    <TouchableOpacity style={style.touchableIngresar}>
                        <Text style={style.buttonText}
                        onPress={() => {
                            Actions.menu({
                                name:this.state.name,
                            });
                        }}>
                            INGRESAR
                        </Text>
                    </TouchableOpacity>
{/*                </Image>*/}
            </View>
        );
    }
}

export default Home;