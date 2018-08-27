import React, { Component } from 'react';
import $ from 'jquery'; 
import io from "socket.io-client";
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = store => ({
  username: store.chat.username,
  messages: store.chat.messages,
  socket: store.chat.socket
});

const dispatchStateToProps = dispatch => ({
  addMessage: (message) => dispatch(actions.addMessage(message)),
});

class Chat extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    // keeping this for now because it's the only thing that updates the page :(
    this.state = {
      message: '',
    };

    const that = this;
    this.props.socket.on('RECEIVE_MESSAGE', data => {
      that.props.addMessage(data);
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    $(".chat-body").toggle();
  }

  sendMessage = ev => {
    ev.preventDefault();
    if (this.state.message.length > 0) {
      this.props.socket.emit('SEND_MESSAGE', {
        author: this.props.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }

  toggleChat(e) {
    e.preventDefault();
    $(".chat-head img").on("click", function() {
      var src = $(".chat-head img").attr("src");
      $(".chat-body").toggle();
      if (src == "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png") {
        $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png");
      } else {
        $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png");
      }
    });
  }

  render(){

    const messages = this.props.messages.map((message, i) => {
      return (
        <div key={i} className="msg-receive">{message.author}: {message.message}</div>
      )
    })

    return(
      <div className="chat-box">
        <div className="chat-head">
          <h2>Customer Service Rep</h2>
          <img src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16" onClick={this.toggleChat}/>
        </div>
        <div className="chat-body">
          <div className="msg-insert">
            <div className="messages">
              {messages ? messages : <div></div>}
            </div>
          </div>
          <div className="chat-text">
            <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
          </div>
          <div className="send">
            <button onClick={this.sendMessage}>SEND</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(Chat);

// import React, { Component } from 'react';
// import $ from 'jquery'; 
// import io from "socket.io-client";
// import { connect } from 'react-redux';
// import * as actions from '../actions/actions.js'
// const socket = io('http://localhost:3000');

// const mapStateToProps = store => ({
//   username: store.username,
//   messages: store.messages
// });

// const dispatchStateToProps = dispatch => ({
//   addMessage: (message) => dispatch(actions.addMessage(message))
// });

// class Chat extends Component {
//   constructor(props) {
//     super(props)

//     this.sendMessage = this.sendMessage.bind(this);
//   }

//   componentDidMount() {
//     socket.on('RECEIVE_MESSAGE', message => {
//       this.props.addMessage(message);
//     });

//     $(".chat-body").toggle();
//   }

//   sendMessage(e) {
//     e.preventDefault();
//     const message = document.getElementById('chat-input');
//     if (message.value.length > 0) {
//       console.log(socket);
//       // emits a message down the websocket to the server
//       // socket.emit('SEND_MESSAGE', {
//       //   author: this.props.username,
//       //   message: message
//       // });
//       message.value = '';
//     }
//   }

//   toggleChat(e) {
//     e.preventDefault();
//     $(".chat-head img").on("click", function() {
//       var src = $(".chat-head img").attr("src");
//       $(".chat-body").toggle();
//       if (src == "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png") {
//         $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png");
//       } else {
//         $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png");
//       }
//     });
//   }

//   render(){

//     console.log(this.props);
//     const messages = this.props.messages ? this.props.messages.map(message => {
//       return (
//         <div className="msg-receive">{message.author}: {message.message}</div>
//       )
//     }) : <div></div>

//     return(
//       <div className="chat-box">
//         <div className="chat-head">
//           <h2>Customer Service Rep</h2>
//           <img src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16" onClick={this.toggleChat}/>
//         </div>
//         <div className="chat-body">
//           <div className="msg-insert">
//             <div className="messages">
//               {messages}
//             </div>
//           </div>
//           <div className="chat-text">
//             <input id='chat-input' type="text" placeholder="Message" className="form-control"/>
//           </div>
//           <div className="send">
//             <button onClick={this.sendMessage}>SEND</button>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default connect(mapStateToProps, dispatchStateToProps)(Chat);