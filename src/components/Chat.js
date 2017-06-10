import React from 'react';
//import {Text,View} from 'react-native';


import {GiftedChat} from 'react-native-gifted-chat';

import Backend from '../Backend';

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    componentWillMount() {

      }


    render(){
        return(
            <GiftedChat
                    messages={this.state.messages}
                    onSend={(message) => {
                        Backend.sendMessage(message);
                    }}
                    user={{
                      _id: Backend.getUid(),
                      name: this.props.name,
                    }}
             />
        /*

            <View>
                <Text>
                    Hello {this.props.name}
                </Text>
            </View>
             */
        );
    }

    componentDidMount(){
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return{
                    messages: GiftedChat.append(previousState.message, message),
                };
            });
        });
    }

    componentWillUnMount(){
        Backend.closeChat();
    }

}

Chat.defaultProps = {
    name:'Pablo',
};

Chat.propTypes={
    name: React.PropTypes.string,
};

export default Chat;