import React from 'react';
import {FlatList, StyleSheet, Text, View,Picker,AppState, Platform } from 'react-native';
import {Actions,} from 'react-native-router-flux';
import PushController from './PushController';  
import PushNotification from 'react-native-push-notification';

const style = require('.././styles.js');

class Notificacion extends React.Component{

    /*state={
        name:this.props.name,
        seconds:5,
        appState: AppState.currentState,
        
    };*/

    constructor(props) {
        super(props);

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
          seconds: 5,
        };
    }
    

    componentWillUnmount() {
        AppState.removeEventListener('change',this.handleAppStateChange);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
          let date = new Date(Date.now() + (this.state.seconds * 1000));

          if (Platform.OS === 'ios') {
            date = date.toISOString();
          }

          PushNotification.localNotificationSchedule({
            message: "My Notification Message",
            date,
          });
        }
  }

    render(){
            return(
                <View style={style.container}>
                    <Text >
                      Choose your notification time in seconds.
                    </Text>
                    <Picker
                      style={{width:100}}
                      selectedValue={this.state.seconds}
                      onValueChange={(seconds) => this.setState({ seconds })}
                    >
                      <Picker.Item label="5" value={5} />
                      <Picker.Item label="10" value={10} />
                      <Picker.Item label="15" value={15} />
                    </Picker>
                    <PushController />
                </View>
            );
        }
}

export default Notificacion;
