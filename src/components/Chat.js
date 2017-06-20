import React from 'react';



import {GiftedChat} from 'react-native-gifted-chat';

import Backend from '../Backend';

class Chat extends React.Component{

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
        );
    }

    componentDidMount(){
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return{
                    messages: GiftedChat.append(previousState.messages, message),
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