const React = require('react-native')
const {StyleSheet,PixelRatio,} = React
const constants = {
  actionColor: '#bbe0ff'
};


import Dimensions from 'Dimensions';

//X is WIDTH, Y is HEIGHT
/*EN MI CEL S7: 
  x=411,43
  y= 731,43  (Total. Es el que usamos)

*/

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;


// ALTO. 
// Multiplico por este valor cuando quiero hacer que los más altos tengan componentes más largos.
const ratioY = y < 800 ? (y < 700 ? (y < 600 ? (y < 500 ? 0.77 : 0.8) :0.9) : 1.1) : 1.2;

// ANCHO
// Multiplico por este valor cuando quiero hacer que los más anchos tengan componentes más anchos.
const ratioX = x < 800 ? (x < 700 ? (x < 600 ? (x < 500 ? 0.77 : 0.8) :0.9) : 1.1) : 1.2;

// We set our base font size value
const base_unit = 1;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
}



//INGRESO EL % DE LA PANTALLA QUE QUIERO QUE OCUPE
function ancho(value){
  return tool.ancho*value/100 - (tool.ancho*value%100/100)
}

//INGRESO EL % DE LA PANTALLA QUE QUIERO QUE OCUPE
function alto(value){
  return tool.altura*value/100 - (tool.altura*value%100/100)
}



// Then we set our styles with the help of the em() function
const tool = {
  
  // DISPOSITIVO
  ancho: x,
  altura: y,
  ratio_X: ratioX,
  ratio_Y: ratioY,

};

/*EN MI CEL S7: 
  ANCHO=411,43
  ALTO= 731,43

*/

var styles = StyleSheet.create({
  //LAYOUT APP
  container:{
   flex: 1,
   backgroundColor: '#006BC0',
   //backgroundColor: '#006BC0',
   //paddingTop: 22,
  },
  

/*  //BACKGROUND IMAGE
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    paddingTop: 22,
  },*/


  //HOME.JS CONTAINER
  HomeContainer:{
    flex:1,
    flexDirection:'column',
  },


  //-------------PAG INICIO-------------

  //BLOQUE TITULO E IMAGEN
/*  BloqueTituloImagen:{
    flex:1,
    flexDirection: 'row',
  },*/
  //TÍTULO "HUELLAS EN RED" VISTA
  HomeTitleView:{
    marginTop:tool.ratio_Y * alto(3.6),    
  },

  //TÍTULO "HUELLAS EN RED" TEXTO
  HomeTitleText:{
    fontSize:alto(6),
    fontWeight: 'bold',
    color:'white',
    textAlign:'center',
  },

  //LOGO VIEW
  logoImageView:{
    flex:1,
    elevation:10,
    height:alto(25),
    width: alto(25),
    borderRadius:100,
    borderWidth:0,
    marginTop:tool.ratio_Y * alto(3),
    marginBottom:tool.ratio_Y * alto(3.2),
    alignSelf:'center',
  },

  //LOGO IMAGE
  logoImage:{
    alignSelf: 'center',
    borderRadius:100,
    // marginTop:30,
    // marginBottom:95,
    height: alto(24),
    width:alto(24),
    borderColor: 'black',
    borderWidth:1,
  },

  //LOGIN BLOCK
  LoginBlockView:{
  }, 

//------------- FIN PAG INICIO-------------

  //SINGLE INPUT VIEW
  singleInputView:{
    height: alto(11),
    elevation:10,
    padding:4,
    borderWidth:2,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    borderRadius:5,
    marginTop: alto(0.2),
    marginLeft:ancho(3),
    marginRight:ancho(3),
    marginBottom:alto(2),
  },

  //SINGLE INPUT TEXT
  singleInputText:{
    fontSize: Math.pow(tool.ratio_Y,2) * 27,
  },

  //ACTION-BUTTON VIEW
  ActionView:{
    elevation:10,
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius:10,
    height: alto(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:ancho(3),
    marginRight:ancho(3),
    marginBottom: tool.ratio_Y * alto(2),
  },

  //LOGIN-TOUCHABLE
  LoginTouchable: {
  },

  //BOTONES-ACTION TEXT
  actionText:{
    color: '#000',
    fontSize: tool.ratio_Y * 35,
    textAlign: 'center',
  },

  //BLOQUE SUB-INGRESO
  BloqueSubIngreso:{
    flex:1,
    flexDirection:'row',
    alignSelf:'center',
    marginTop:  alto(1),
    marginLeft: ancho(1),
    marginRight:ancho(1),
  },

  //Vista BOTON REGISTRESE
  ButtonRegistrese:{
    flex:tool.ratio_X * 9.4,
  },

  //TEXTO REGISTRESE
  TextoRegistrese:{
    textAlign:'right',
    fontSize: tool.ratio_Y * 18,
    color: 'white',
    fontWeight:'bold',
  },

  // Separador
  Separador:{
    flex:1,
    marginLeft: tool.ratioY * alto(4),
    marginRight:tool.ratioY * alto(4),
  },
  //Texto Separador
  TextoSeparador:{
    textAlign:'center',
    fontSize: tool.ratio_Y * 16,
    color: 'white',
    fontWeight:'bold',
  },
    //VISTA BOTON CONTRASEÑA 
  ButtonContrasena:{
    flex:tool.ratio_X * 14,
  },

  //TEXTO CONTRASEÑA
  TextoContrasena:{
    textAlign:'left',
    fontSize: tool.ratio_Y * 18,
    color: 'white',
    fontWeight:'bold',
  },
  //MULTILINE INPUT VIEW
  MultiLineInputView:{
    elevation:10,
    backgroundColor:'white', 
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius:10,
    marginTop:alto(2),
    marginRight:ancho(3),
    marginLeft:ancho(3),
    marginBottom:alto(2),
  },

  //MULTILINE INPUT TEXT
  multilineInputText:{
    fontSize:25,
    textAlignVertical: 'top',
    height: 250,
    flexWrap: 'wrap', 
  },

  //DATE-PICKER VIEW
  DatePickerView:{
    flex:1,
    flexDirection:'row',
    elevation:10,
    padding:4,
    height:alto(10),
    borderWidth:2,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    borderRadius:5,
    marginTop: 5,
    marginLeft:ancho(3),
    marginRight:ancho(3),
    marginBottom:20,
    //alignItems:'center',
  },

  //TÍTULOS INDICATIVOS DE LA APP VIEW
  TituloIndicativoView:{
    marginTop: alto(1.5),
    marginLeft:ancho(3.7),
    marginRight:ancho(3.7),
    marginBottom:0,
  },

  //TÍTULOS INDICATIVOS DE LA APP TEXT
  TituloIndicativoText:{
    fontSize:25,
    color:'white',
    fontWeight:'bold',
  },

  //IMAGEN-CALENDARIO VIEW
  DatePickerImageView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  //IMAGEN-CALENDARIO IMAGE
  DatePickerImage:{
    width:alto(8),
    height:alto(8),
  },

  //BOTON FECHA
  DatePickerButton:{
    flex:10,
    justifyContent:'center',
  },

  //DATE-PICKER TEXT
  DatePickerText:{
    fontSize:tool.ratio_Y * 24,
    color:'grey',
  },

  //BOTONES-LISTAS VIEW
  ButtonsView:{
    elevation:10,
    borderWidth:0,
    borderRadius:15,
    borderColor: 'grey',
    marginTop:alto(3),
    marginBottom:0,
    marginLeft:ancho(2),
    marginRight:ancho(2),
    backgroundColor: '#bbe0ff',
    height: alto(11),
    alignItems:'center',
    justifyContent:'center',
  },

  //BOTONES-LISTAS TEXT
  ButtonsText:{
    fontSize:tool.ratio_Y * 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'black',
    fontFamily: 'monospace',
  },

  //NOTIFICACIONES VIEW
  GralNotifView:{
    flex:1,
    borderWidth:0,
    borderRadius:4,
    borderColor: 'grey',
    marginTop:6,
    marginLeft:5,
    marginRight:5,
    marginBottom:0,
    backgroundColor: '#ffe6ff',
    height: 120,
  },

  //TÍTULO-NOTIFICACIONES VIEW
  TitNotifView:{
    alignItems:'center',
    marginBottom:3,
    backgroundColor: '#66ffcc',
  },

  //TÍTULO-NOTIFICACIONES TEXT
  TitNotifText:{
    fontSize:20,
    color:'#b300b3',
    fontWeight:'bold',

  },

  //BLOQUE DE DATOS-NOTIFICACIONES VIEW
  BlockDataNotiView:{
    flex:1,
  },

  //NOTIFICACIONES
  CatNotifView:{
    alignSelf:'center',
    flex:1,
  },

  //DATOS-NOTIFICACIONES VIEW EVENTOS
  DataNotifView:{
    marginLeft:8,
    flex:1,
  },

    //DATOS-NOTIFICACIONES VIEW USUARIO AUSENTE
  DataNotifView2:{
    alignSelf:'center',
    flex:1,
  },
  
  //DATOS-NOTIFICACIONES TEXT
  DataNotifText:{
    fontSize:19,
    color:'black',
    fontWeight:'bold',
  },
  
  //BOTON-USUARIOS-CHAT VIEW
  ChatUserView:{
    elevation:0,
    borderWidth:1,
    borderRadius:0,
    borderColor: 'grey',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom:0,
    backgroundColor: '#fff',
    height: 65,
    alignItems:'center',
    justifyContent:'center',
  },

  //BOTON-USUARIOS-CHAT TEXT
  ChatUserText:{
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'black',
    fontFamily: 'monospace',
  },

  


  //SELECTS.
  viewPicker:{
    elevation:10,
    marginTop:alto(2),
    marginBottom:alto(1.5),
    marginLeft:ancho(3),
    marginRight:ancho(3),
    height:alto(9),
    backgroundColor:'white',
    borderRadius:5,
    borderWidth: 2,
    borderColor:'black',


  },

//----------CATALOGO----------
  //LISTA DE ITEMS CATALOGOS
  catalogoView:{
    flex:1,
    flexDirection:'column',
    elevation:10,
    backgroundColor:'#FFF', 
    borderColor: 'red',
/*    borderWidth: 2,*/
    borderLeftWidth:2,
    borderRightWidth:2,
    borderTopWidth:3,
    borderBottomWidth:3,
    borderRadius:0,
    marginTop:alto(1.5),
/*    marginRight:ancho(3),
    marginLeft:ancho(3),*/
    marginBottom:alto(1.5),
    height: alto(80),
  },

  //
  catalogoInfoView:{
    flex:1,
    flexDirection:'row',
  },

  //TEXTO VIEW
  catalogoTextSubView:{
    flex:1,
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'black',
    marginLeft:ancho(1),
  },
  
  //INFORMACIÓN VIEW
  catalogoInfoSubView:{
    flex:2.3,
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'black',
  },

  //TEXTO TEXT
  catalogoTextoText:{
    fontSize:19,
    color:'black',
    fontWeight:'bold',
  },  

  //HEADER PRODUCTO INFO TEXT
  catalogoProdInfoText:{
    alignSelf:'center',
    textDecorationLine:'underline',
    fontSize:30,
    color:'#ff0000',
  },

  //INFO TEXT
  catalogoInfoText:{
    fontSize:19,
    color:'blue',
    fontWeight:'bold',
  },

  //IMAGEN CATALOGO
  imagenCatalogo:{
    width: alto(30),
    height: alto(30),
    alignSelf:'center',
    marginTop:alto(3),
    marginBottom:alto(3),
  },

//----------FIN CATALOGO----------

//----------VALORACIÓN----------

  valoracionView:{
    flex:1,
    flexDirection:'column',
    elevation:10,
    backgroundColor:'#FFF', 
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:15,
    marginTop:alto(1.5),
    marginRight:ancho(6),
    marginLeft:ancho(6),
    marginBottom:alto(1.5),
    height: 120,
  },

  nameView:{
    flex: 1,
  },

  nameText:{
    alignSelf:'center',
    textDecorationLine:'underline',
    fontSize:24,
    fontWeight:'bold',
    color:'#886800',
  },

  starsView:{
    flex: 1.3,
    /*alignItems:'center',*/
    marginRight: Math.pow(tool.ratio_X,2) * 62,
    marginLeft: Math.pow(tool.ratio_X,2) *62,
  },

  valoracionView2:{
    flex:1,
    flexDirection:'column',
    elevation:10,
    backgroundColor:'#FFF', 
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:15,
    marginTop:alto(0.5),
    marginRight:ancho(6),
    marginLeft:ancho(6),
    marginBottom:-30,
    height: 95,
  },

  puntajeView:{
    flex:1,
    flexDirection:'row',
    marginLeft:ancho(3),
    marginRight:ancho(3),
  },  

  puntajeView2:{
    flex:1.2,
    flexDirection:'row',
    marginLeft:ancho(3),
    marginRight:ancho(3),
  },

  puntajeText:{
    fontSize: 18,
    color: 'black',
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight:'bold',
  },    

  puntajeValor:{
    fontSize: 18,
    color: '#886800',
    textAlignVertical:'center',
    textAlign:'center',

  },

  espacio:{
    marginLeft: ancho(2),
  },

//----------FIN VALORACIÓN----------



  //TEXTO ARRIBA DE LA HISTORIA
  textTituloHistoria:{
    alignSelf:'center',
    textDecorationLine:'underline',
    fontSize:27,
    fontWeight:'bold',
    color:'white',
    marginTop: 40,
    marginBottom:5,

  },

  //VISTA VER HISTORIA
  storyView:{
    elevation:10,
    backgroundColor:'white', 
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius:10,
    marginTop:10,
    marginRight:15,
    marginLeft:15,
    marginBottom:10,
    height:350,
  },

  //TEXTO VER HISTORIA
  storyText:{
    fontSize:23,
    color:'black',
  },

  //No sé.
  sectionHeader:{
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },

  //No sé
  title:{
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
  },

  //No sé
  listview:{
    flex: 1,
  },

  //Styles para los componentes de la libreira Image picker usada para el catalogo
  avatarView:{
    alignSelf:'center',
  },

  avatarContainer: {
    /*borderColor: '#9B9B9B',*/
    borderColor: '#FFF',
    borderWidth: 5 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


})

module.exports = styles
module.exports.constants = constants;


/*                EQUIPO_503 
                                _._
                              _/:|:
                             /||||||.
                             ||||||||.
                            /|||||||||:
                           /|||||||||||
                          .|||||||||||||
                          | ||||||||||||:
                        _/| |||||||||||||:_=---.._
                        | | |||||:'''':||  '~-._  '-.
                      _/| | ||'         '-._   _:    ;
                      | | | '               '~~     _;
                      | '                _.=._    _-~
                   _.~                  {     '-_'
           _.--=.-~       _.._          {_       }
       _.-~   @-,        {    '-._     _. '~==+  |
      ('          }       \_      \_.=~       |  |
      `,,,,,,,'  /_         ~-_    )         <_oo_>
        `-----~~/ /'===...===' +   /
               <_oo_>         /  //
                             /  //
                            <_oo_>                          */