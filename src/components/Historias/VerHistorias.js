import React from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    ScrollView,
} from 'react-native';
import Backend from '../../Backend';
import ActionButton from  '../ActionButton';
const style = require('./../styles.js');

class VerHistorias extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                text: ' ',
                categorias: ['Seleccione una categoría','Música', 'Teatro', 'Cine', 'Literatura', 'Historia Nacional','Historia Internacional','Actividades Manuales','Cocina','Deportes','Miscelaneouss'],
                selectedCategoria: ' ',
                titulos:['Seleccione un título'],
                selectedTitulo: ' ',
                historias:[]
            };
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    componentWillMount() {

      }


    render(){
      
        let categoryItems = this.state.categorias.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
        let tituloItems = this.state.titulos.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

        return(
            <View style={style.container}>
                    <Picker
                      selectedValue={this.state.selectedCategoria}
                      onValueChange={ (category) => {this.setState({selectedCategoria:category});this.limpiarSeleccionCategoria();this.getHistoriasPorCategoria(category)} }
                      mode="dropdown">
                      {categoryItems}
                    </Picker>

                    <Picker
                      selectedValue={this.state.selectedTitulo}
                      onValueChange={ (titulo) => {this.setState({selectedTitulo:titulo});this.limpiarSeleccionTitulo();this.getHistoriasPorTitulo(titulo)} }
                      mode="dropdown"
                      style={{height:50,}}>
                      {tituloItems}
                    </Picker>
                    
                    <Text style={{fontSize: 20,height:40,fontWeight: 'bold',textAlign: 'center',color:'red'}}>
                        Historia
                    </Text>
                    <ScrollView>
                        <Text>
                            {this.state.text==" "?"No hay historias":this.state.text}
                        </Text>
                    </ScrollView>
            </View>
        );
    }


    componentDidMount(){
    }

    getHistoriasPorCategoria(category) {
            Backend.loadHistories((historia) => {
                this.setState({
                    titulos: this.state.titulos.concat([historia.titulo]),
                    historias: this.state.historias.concat([{categoria: historia.category,titulo:historia.titulo,historia:historia.text}]),
                });
            }, category);
    }

    getHistoriasPorTitulo(titulo){
        for (var i = this.state.historias.length - 1; i >= 0; i--) {
            if(this.state.historias[i].titulo==titulo){
                this.setState({text:this.state.historias[i].historia,selectedCategoria:'Seleccione una categoría'});
                break;
            }
            
        }
    }

    componentWillUnMount(){
        Backend.closeHist();
    }

    limpiarSeleccionCategoria(){
        this.setState({titulos:['Seleccione un título'],text:" "});
    }

    limpiarSeleccionTitulo(){
        this.setState({text:" "});
    }

}


export default VerHistorias;