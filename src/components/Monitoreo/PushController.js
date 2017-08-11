import React from 'react';
import PushNotification from 'react-native-push-notification';


export default class PushController extends React.Component{

    componentDidMount(){
        PushNotification.configure({

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",
        });
    }
    
    render(){
            return null;
    }
}
