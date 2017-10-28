import React, {Component} from 'react';
import ReactNative from 'react-native';
const { 
    View, 
    TouchableHighlight, 
    Text,
    TextInput,
    ScrollView,
  } = ReactNative;
const style = require('./../styles.js');

class ListItem extends Component {

  render() {
    return (
        <TouchableHighlight onPress={this.props.onPress}>
          <View>
                      
              <View style={style.GralNotifView}>

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

              {/* BARRIO */}
                <View style={style.SubBlockDataView}>
                  <View style={style.TitleNotifView}>
                    <Text style={style.TitleNotifText}>
                      BARRIO:
                    </Text>
                  </View>                
                  <View style={style.DataNotifView}>
                    <Text style={style.DataNotifText}>
                      {this.props.item.barrio} 
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


              {/* DESCRIPCIÓN */}
                <View style={style.SubBlockDescView}>
                  <View style={style.TitleNotifView}>
                    <Text style={style.TitleNotifText}>
                      DESCRIPCIÓN:
                    </Text>
                  </View>                

                  <View style={style.DataDescView}>
                    <View style={style.descEventoView}>
                          <Text style={style.descEventoText}>
                              {this.props.item.descripcion==" "?"NO HAY DESCRIPCIÓN":this.props.item.descripcion}
                          </Text>
                     </View>
                  </View>
                </View>

                </View>
              </View>
          
          </View>
        </TouchableHighlight>
    );
  }
}

module.exports = ListItem;