import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
} from 'react-native';

import {
    Actions,
} from 'react-native-router-flux';

import ActionButton from  '../ActionButton';
import Backend from '../../Backend';
import SelectMultiple from './SelectMultiple'

const style = require('../styles.js');
const interes = ['MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'];


export default class CrearPerfil extends React.Component{
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        this.state = {userId:this.props.userId,
                        name:'',
                        barrio:'',
                        centro:'',
                        // interes: ['MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'],
                        selectedInteres: [],
                        selectedPerfil: ' ',
                        perfiles: ['SELECCIONAR PERFIL','USUARIO', 'VOLUNTARIO', 'CENTRO',],
                    }
    }

    onSelectionsChange = (selectedInt) => {
        for(var keyPre in selectedInt){
            this.setState({ selectedInteres:this.state.selectedInteres.concat([selectedInt[keyPre].label]) })
        }
    }
        
    render(){
        let perfilItems = this.state.perfiles.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
            });
        return(
           
             // <Image source={require('./imagenes/difuminado1.jpg')} style={style.backgroundImage}>
            <ScrollView style={style.container} >

                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={700} >

                    <View>
                            

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"NOMBRE USUARIO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            name:text,
                                        })
                                    }}
                                    value= {this.state.name}
                                />
                            </View>

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"BARRIO"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            barrio:text,
                                        })
                                    }}
                                    value= {this.state.barrio}
                                />
                            </View>

                            <View>
                                <TextInput 
                                    style={style.singleInputText}
                                    placeholder='"CENTRO DE JUBILADOS"'
                                    onChangeText={ (text) => {
                                        this.setState({
                                            centro:text,
                                        })
                                    }}
                                    value= {this.state.centro}
                                />
                            </View>

                            <View>
                                <SelectMultiple
                                  items={interes}
                                  selectedItems={this.state.selectedInteres}
                                  onSelectionsChange={this.onSelectionsChange} />
                            </View>

                            <View style={style.viewPicker}>
                                <Picker
                                    selectedValue={this.state.selectedPerfil}
                                    onValueChange={ (perfil) => {this.setState({selectedPerfil:perfil});} }
                                    mode="dialog">
                                    {perfilItems}
                                </Picker>
                            </View>

                            <View>
                                <ActionButton 
                                    title="AGREGAR"
                                    onPress={()=>{
                                                    Backend.agregarUsuario(this.state.userId, this.state.name, this.state.barrio,
                                                        this.state.centro, this.state.selectedInteres, this.state.selectedPerfil);
                                                }
                                            }
                                />
                
                            </View>
                    </View>


                </KeyboardAvoidingView>
            
            </ScrollView>
        //</Image>
           
        );
    }
}

