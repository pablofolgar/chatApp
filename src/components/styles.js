const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#bbe0ff'
};

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

  //TÍTULOS INDICATIVOS DE LA APP VIEW
  TituloIndicativoView:{
    marginTop: 10,
    marginLeft:15,
    marginRight:15,
    marginBottom:0,
  },

  //TÍTULOS INDICATIVOS DE LA APP TEXT
  TituloIndicativoText:{
    fontSize:25,
    color:'white',
    fontWeight:'bold',
  },

  //TÍTULO "HUELLAS EN RED"
  tituloInicio:{
    fontSize:35,
    fontWeight: 'bold',
    color:'white',
    marginTop:110,
    textAlign:'center',
  },

  //LOGO VIEW
  logoImageView:{
    elevation:10,
    height:183,
    width:183,
    borderRadius:100,
    borderWidth:0,
    marginTop:30,
    marginBottom:45,
    alignSelf:'center',
  },

  //LOGO IMAGE
  logoImage:{
    alignSelf: 'center',
    borderRadius:100,
    // marginTop:30,
    // marginBottom:95,
    height:180,
    width:180,
    borderColor: 'black',
    borderWidth:1,
  },

  //SINGLE INPUT VIEW
  singleInputView:{
    elevation:10,
    padding:4,
    height:70,
    borderWidth:2,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    borderRadius:5,
    marginTop: 5,
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
  },

  //SINGLE INPUT TEXT
  singleInputText:{
    fontSize:28,
  },

  //MULTILINE INPUT VIEW
  MultiLineInputView:{
    elevation:10,
    backgroundColor:'white', 
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius:10,
    marginTop:10,
    marginRight:15,
    marginLeft:15,
    marginBottom:10,
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
    height:70,
    borderWidth:2,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    borderRadius:5,
    marginTop: 5,
    marginLeft:15,
    marginRight:15,
    marginBottom:20,
    //alignItems:'center',
  },

  //IMAGEN-CALENDARIO VIEW
  DatePickerImageView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  //IMAGEN-CALENDARIO IMAGE
  DatePickerImage:{
    width:50,
    height:50,
  },

  //BOTON FECHA
  DatePickerButton:{
    flex:4,
    justifyContent:'center',
  },

  //DATE-PICKER TEXT
  DatePickerText:{
    fontSize:26,
    color:'grey',
  },

  //BOTONES-LISTAS VIEW
  ButtonsView:{
    elevation:10,
    borderWidth:0,
    borderRadius:15,
    borderColor: 'grey',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom:12,
    backgroundColor: '#bbe0ff',
    height: 80,
    alignItems:'center',
    justifyContent:'center',
  },

  //BOTONES-LISTAS TEXT
  ButtonsText:{
    fontSize: 35,
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

  CatNotifView:{
    alignSelf:'center',
    flex:1,

  },

  //DATOS-NOTIFICACIONES VIEW
  DataNotifView:{
    marginLeft:8,
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

  //BOTONES-ACTION VIEW
  action: {
    elevation:10,
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius:10,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:15,
    marginRight:15,
    marginBottom:25,
  },

  //BOTONES-ACTION TEXT
  actionText:{
    color: '#000',
    fontSize: 32,
    textAlign: 'center',
  },
  


  //SELECTS.
  viewPicker:{
    elevation:10,
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
    height:55,
    backgroundColor:'white',
    borderRadius:5,
    borderWidth: 1,
    borderColor:'grey',

  },

  //TEXTO ARRIBA DE LA HISTORIA
  textTituloHistoria:{
    alignSelf:'center',
    fontSize:27,
    fontWeight:'bold',
    color:'white',
    marginTop: 40,
    marginBottom:5,
    textDecorationLine:'underline',

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