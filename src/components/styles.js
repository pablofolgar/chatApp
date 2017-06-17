const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
     flex: 1,
     paddingTop: 22
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
      fontSize: 18,
      height: 44,
    },
    title:{
            marginTop: 20,
            marginLeft: 20,
            fontSize: 20,
        },
        nameInput:{
            padding:5,
            height:40,
            borderWidth:2,
            borderColor: 'black',
            margin: 20,
        },
        buttonText:{
            marginLeft:20,
            fontSize:20,
        },
})

module.exports = styles
module.exports.constants = constants;
