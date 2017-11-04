import React, {Component} from 'react';
import ReactNative from 'react-native';
const { 
    View, 
    TouchableHighlight, 
    Text 
  } = ReactNative;
import renderIf from './RenderIf';
const style = require('./../styles.js');

class ListItem extends Component {
  render() {
    return (
            <View>
             {renderIf(!this.props.item.perfilCentro, 
                        
                //TODA LA NOTIFICACIÓN
              <TouchableHighlight onPress={this.props.onPress}>
                
                <View>
                  
                  <View style={style.GralNotifView}>
                  
                  {/*TEXTOS DE LA NOTIFICACION*/}
                    <View style={style.TitNotifView}>
                      <Text style={style.TitNotifText}>
                        ¡HAY UN EVENTO NUEVO PARA VOS!
                      </Text>
                    </View>


                  {/*TEXTOS DE LA NOTIFICACION*/}
                    <View style={style.BlockDataNotiView}>

                      <View style={style.CatNotifView}>
                        <Text style={style.CatNotifText}>
                          **{this.props.item.categoria}** {/*{"\n"}*/}
                        </Text>
                      </View>

                    {/* FECHA */}
                    <View style={style.SubBlockDataView}>
                      <View style={style.TitleNotifView}>
                        <Text style={style.TitleNotifText}>
                          FECHA: 
                        </Text>
                      </View>                
                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          {this.props.item.fecha} 
                        </Text>
                      </View>
                    </View>
                  
                  {/* HORA */}
                    <View style={style.SubBlockDataView}>
                      <View style={style.TitleNotifView}>
                        <Text style={style.TitleNotifText}>
                          HORA:
                        </Text>
                      </View>                
                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          {this.props.item.hora}hs
                        </Text>
                      </View>
                    </View>            


                  {/* CENTRO */}
                    <View style={style.SubBlockDataView}>
                      <View style={style.TitleNotifView}>
                        <Text style={style.TitleNotifText}>
                          CENTRO:
                        </Text>
                      </View>                
                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          {this.props.item.centro} 
                        </Text>
                      </View>
                    </View>                  

                  {/* AVISO */}
                    <View style={style.SubBlockClickView}>

                        <Text style={style.clickText}>
                          OPRIMA PARA VER MÁS
                        </Text>
               
                    </View>

                  </View>
                </View>
                
                </View>

{/*                <View>
                  <View style={style.GralNotifView}>

                    //TEXTOS DE LA NOTIFICACION
                    <View style={style.TitNotifView}>
                      <Text style={style.TitNotifText}>
                        ¡HAY UN EVENTO PARA VOS!
                      </Text>
                    </View>

                    //TITULO DE LA NOTIFICACIÓN
                    <View style={style.BlockDataNotiView}>
                      <View style={style.CatNotifView}>
                        <Text style={style.DataNotifText}>
                          **{this.props.item.categoria}** 
                        </Text>
                      </View>

                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          DESCRIPCION: {this.props.item.descripcion} 
                        </Text>
                      </View>*/}
                    {/*
                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          FECHA: {this.props.item.fecha} 
                        </Text>
                      </View>

                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          HORA: {this.props.item.hora} 
                        </Text>
                      </View>

                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          BARRIO:  {this.props.item.barrio}
                        </Text>
                      </View>
                      <View style={style.DataNotifView}>
                        <Text style={style.DataNotifText}>
                          CENTRO:  {this.props.item.centro}
                        </Text>
                      </View>
                    */}

  {/*                  </View>
                  </View>
                </View>*/}
              </TouchableHighlight>
            )}
        
            {renderIf(this.props.item.perfilCentro,
              <TouchableHighlight onPress={this.props.onPress}>
                <View>
                  {/*TODA LA NOTIFICACIÓN*/}
                  <View style={style.GralNotifView}>

                    {/*TITULO DE LA NOTIFICACIÓN*/}
                    <View style={style.TitNotifView}>
                      <Text style={style.TitNotifText}>
                        USUARIO AUSENTE
                      </Text>
                    </View>

                    <View style={style.BlockDataNotiView}>

                      <View style={style.DataNotifView2}>
                        <Text style={style.DataNotifText}>
                          EL USUARIO {this.props.item.name}
                        </Text>
                      </View> 

                      <View style={style.DataNotifView2}>
                        <Text style={style.DataNotifText}>
                          NO SE CONECTA HACE
                        </Text>
                      </View> 

                      <View style={style.DataNotifView2}>
                        <Text style={style.DataNotifText}>
                           {this.props.item.diasDeAusencia} DÍAS.
                        </Text>
                      </View>

                    </View>

                  </View>
                </View>
              </TouchableHighlight>
            )}
      </View>
    );
  }
}

module.exports = ListItem;