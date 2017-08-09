const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
     flex: 1,
     paddingTop: 22,
     backgroundColor: '#006599',
    },

   backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'

  },

    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },

    item: {
      padding: 10,
      fontSize: 35,
      height: 70,
      textAlign: 'center',
      borderWidth: 2,
      borderRadius:10,
      marginBottom:20,
      backgroundColor: '#99ff99',
      color:'black',
      fontFamily: 'monospace',
    },

    touchableItem:{
        height: 70,
        backgroundColor: '#99ff99',
        borderWidth:2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop:5,
        marginBottom:20,
    },

    title:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 25,
        },

    nameInput:{
        padding:5,
        height:70,
        fontSize:28,
        borderWidth:2,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        borderRadius:5,
        flexWrap:'wrap',
    },

    nameInputTitulo:{
        padding:5,
        height:70,
        fontSize:28,
        borderWidth:2,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        borderRadius:5,
        flexWrap:'wrap',
    },


    historiaInput:{
        flexWrap: 'wrap', 
        height: 300,
        borderColor: 'grey',
        backgroundColor:'white', 
        borderWidth: 1,
        textAlignVertical: 'top',
},

    buttonText:{
        //marginLeft:20,
        textAlign: 'center',
        fontSize:30,
        color:'black',
        fontFamily: 'monospace',
    },
    touchableIngresar:{
        height: 75,
        width: 200,
        backgroundColor: '#99ff99',
        borderWidth:1,
        borderColor: 'black',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 5,
        
      },

    action: {
        backgroundColor: constants.actionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
      },

      actionText: {
          color: '#fff',
          fontSize: 16,
          textAlign: 'center',

        },
        listview: {
            flex: 1,
          },
})

module.exports = styles
module.exports.constants = constants;
