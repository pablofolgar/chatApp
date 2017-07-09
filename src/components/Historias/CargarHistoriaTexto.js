import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Picker,
} from 'react-native';
import Categorias from './CategoriasHistorias';
import ActionButton from  '../ActionButton';
import Backend from '../../Backend';
const style = require('./../styles.js');

class CargarHistoriaTexto extends React.Component{
    state={
        name:this.props.name,
        categoria: this.props.categoria,
        titulo:'',
        history:'',
    };


     componentWillMount() {

    }


    render(){
            return(
                <View>
                    <Text> Seleccione una categoria</Text>


                    <Picker
                      selectedValue={this.state.categoria}
                      onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}>
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                    <Text> Ingrese un titulo para su historia</Text>

                    <TextInput style={style.nameInput}
                        placeholder='Vacaciones'
                        onChangeText={ (text) => {
                            this.setState({
                                titulo:text,
                            })
                        }}
                        value= {this.state.titulo}
                    />

                    <Text> Ingrese su historia</Text>

                    <TextInput
                            style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(history) => this.setState({history})}
                            value={this.state.history}
                    />

                    <ActionButton title="Agregar"
                        onPress={() => {Backend.sendHistory(this.state.name,this.state.categoria,
                        this.state.titulo,this.state.history);}}
                        />
                </View>
            );
        }

 }



 export default CargarHistoriaTexto;