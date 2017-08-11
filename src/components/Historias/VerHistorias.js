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
                categorias: ['SELECCIONAR CATEGORÍA','MÚSICA', 'TEATRO', 'CINE', 'LITERATURA', 'HISTORIA NACIONAL','HISTORIA INTERNACIONAL','MANUALIDADES','COCINA','DEPORTES','MISCELÁNEA'],
                selectedCategoria: ' ',
                titulos:['SELECCIONE TÍTULO'],
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

                <View style={style.viewPicker}>
                    <Picker
                      selectedValue={this.state.selectedCategoria}
                      onValueChange={ (category) => {this.setState({selectedCategoria:category});this.limpiarSeleccionCategoria();this.getHistoriasPorCategoria(category)} }
                      mode="dialog">
                      {categoryItems}
                    </Picker>
                </View>

                <View style={style.viewPicker}>
                    <Picker
                      selectedValue={this.state.selectedTitulo}
                      onValueChange={ (titulo) => {this.setState({selectedTitulo:titulo});this.limpiarSeleccionTitulo();this.getHistoriasPorTitulo(titulo)} }
                      mode="dialog"
                      style={{height:50,}}>
                      {tituloItems}
                    </Picker>
                </View>
                    
                <View>
                    <Text style={style.textTituloHistoria}>
                        Historia
                    </Text>
                </View>


                <View style={style.storyView}>
                    <ScrollView>
                        <Text style={style.storyText}>
                            {this.state.text==" "?"NO HAY HISTORIAS":this.state.text}
                        </Text>
                    </ScrollView>
                </View>

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
                this.setState({text:this.state.historias[i].historia});
                break;
            }
            
        }
    }

    componentWillUnMount(){
        Backend.closeHist();
    }

    limpiarSeleccionCategoria(){
        this.setState({titulos:['SELECCIONE TÍTULO'],text:" "});
    }

    limpiarSeleccionTitulo(){
        this.setState({text:" "});
    }

}


export default VerHistorias;