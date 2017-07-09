import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import Backend from '../../Backend';

class VerHistorias extends React.Component{

    constructor(){
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ]
    }

    state = {
        messages: [],
      };

    componentWillMount() {

      }


    render(){
        return(
            <View>
                <Text> Aca se visualizan las historias</Text>
            </View>
        );
    }

    componentDidMount(){

    }

    componentWillUnMount(){
        Backend.closeHist();
    }

}

export default VerHistorias;