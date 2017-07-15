import React from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
} from 'react-native';
import Backend from '../../Backend';
import ActionButton from  '../ActionButton';
const style = require('./../styles.js');

class VerHistorias extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                text: ' ',
                titulo: ' ',
                categoria: 'java',
            };
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    componentWillMount() {

      }


    render(){
        return(
            <View>
                <Text> Seleccione una categoria</Text>
                    <Picker
                      selectedValue={this.state.categoria}
                      onValueChange={(itemValue, itemIndex)=>this.setState({categoria: itemValue})}
                      mode="dropdown">
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                    <Text> Seleccione un titulo</Text>
                   <TextInput style={style.nameInput}
                       placeholder='Vacaciones'
                       onChangeText={ (text) => {
                           this.setState({
                               titulo:text,
                           })
                       }}
                       value= {this.state.titulo}
                   />
                    <ActionButton title="Buscar" onPress={()=>{
                                            console.log("Boton Buscar");
                                            var camposLlenos = this.validarCamposRequeridos();
                                            if(camposLlenos){
                                                this.setState({text:" "});
                                                this.listenForItems();
                                            }
                                          }}/>
                    <Text>
                        Historia:
                        {this.state.text==" "?"No hay historias":this.state.text}
                    </Text>
            </View>
        );
    }


    componentDidMount(){

    }

    listenForItems() {
            Backend.loadHistories((callback) => {
            console.log("Despues entro por aca");
                console.log('callback.text: '+callback.text);
                this.setState({
                    text:callback.text,
                });
            }, this.state.categoria, this.state.titulo);
    }

    componentWillUnMount(){
        Backend.closeHist();
    }

    validarCamposRequeridos(){
            var result = true;
            if( this.state.categoria==" " ||
                this.state.titulo==" "){
                alert("Debe completar todos los campos");
                result = false;
            }
            return result;
    }

}


export default VerHistorias;