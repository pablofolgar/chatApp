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
      <TouchableHighlight>
        <View>
          {renderIf(!this.props.item.perfilCentro, 
                    
                    //TODA LA NOTIFICACIÓN
                    <View style={style.GralNotifView}>

                      {/*TITULO DE LA NOTIFICACIÓN*/}
                      <View style={style.TitNotifView}>
                        <Text style={style.TitNotifText}>
                          ¡HAY UN EVENTO PARA VOS!
                        </Text>
                      </View>

                      {/*TEXTOS DE LA NOTIFICACION*/}
                      <View style={style.BlockDataNotiView}>
                        <View style={style.CatNotifView}>
                          <Text style={style.DataNotifText}>
                            **{this.props.item.categoria}** {/*{"\n"}*/}
                          </Text>
                        </View>

                        <View style={style.DataNotifView}>
                          <Text style={style.DataNotifText}>
                            FECHA: {this.props.item.fecha} 
                          </Text>
                        </View>

                        <View style={style.DataNotifView}>
                          <Text style={style.DataNotifText}>
                            BARRIO:  {this.props.item.barrio}
                          </Text>
                        </View>
                      </View>

                    </View>
                )}
                
                {renderIf(this.props.item.perfilCentro,
                  <View style={style.NotificationView}>
                    <View style={style.TituloNotificationView}>
                        <Text style={style.TituloNotificationText}>
                          USUARIO AUSENTE
                        </Text>
                      </View>
                    <Text style={style.DatosNotificationText}>
                      El usuario {this.props.item.name} no se conecta desde hace {this.props.item.diasDeAusencia} días.
                    </Text>
                  </View>
            )}
          
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;