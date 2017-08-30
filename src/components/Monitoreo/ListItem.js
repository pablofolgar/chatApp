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

          //TODA LA NOTIFICACIÓN
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
        )}
          
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;