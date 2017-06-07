import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
              },
            },
          ],
        });
      }


    render(){
        return(
            <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                      _id: 1,
                    }}
             />
        );
    }

    onSend(messages = []) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
      }

}

Chat.defaultProps = {
    name:'Pablo',
};

Chat.propTypes={
    name: React.PropTypes.string,
};

export default Chat;