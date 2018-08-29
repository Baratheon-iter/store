import React, { Component } from 'react';
import $ from 'jquery'; 
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js'

const mapStateToProps = store => ({
  username: store.chat.username,
  messages: store.chat.messages,
  socket: store.chat.socket,
  room: store.chat.room,
  admin: store.chat.admin
});

const dispatchStateToProps = dispatch => ({
  addMessage: (message) => dispatch(actions.addMessage(message)),
  fetchUserInfo: () => dispatch(actions.fetchUserInfo())
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      rooms: null,
      join: false,
      dummy: false
    };

    this.selectUser = this.selectUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.ensureSocketIsSet = this.ensureSocketIsSet.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  componentDidMount() {
    $(".chat-body").toggle();

    // get user info from server
    this.props.fetchUserInfo();

    // waits till socket is set before listening for messages
    const that = this;
    this.ensureSocketIsSet(that)
    .then(() => {
      if (!that.props.admin) {  // not an admin
        // join private room
        that.props.socket.emit('room', that.props.room);

        // listen for messages
        that.props.socket.on('RECEIVE_MESSAGE', data => {
          that.props.addMessage(data);

          // I made this dummy boolean to force the page to rerender.
          // It's probably not right but it works so there.
          that.setState(previousState => {
            previousState.received === !previousState.received;
            return previousState;
          })
        });
      } else { // an admin
        fetch('/getRooms')
        .then(function(response) {
          return response.text()
            .then(function(text) {
              const rooms = JSON.parse(text);
              that.setState((previousState) => {
                previousState.rooms = rooms;  // setting the socket rooms to state
                return previousState;
              })
          });
        })
      }
    })
  }

  ensureSocketIsSet(that) {
    return new Promise((resolve, reject) => {
      (function checkSocket() {
        if (that.props.room) return resolve();
        setTimeout(checkSocket, 30);
      })();
    })
  }

  sendMessage = ev => {
    ev.preventDefault();
    if (this.state.message.length > 0) {
      this.props.socket.emit('SEND_MESSAGE', {
        author: this.props.username,
        message: this.state.message,
        admin: false
      });
      this.setState({message: ''});
    }
  }

  toggleChat(e) {
    e.preventDefault();
    let src = $(".chat-head img").attr("src");
    $(".chat-body").toggle();
    if (src == "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png") {
      $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png");
    } else {
      $(".chat-head img").attr("src", "https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png");
    }
  }

  selectUser(e) {
    if (e.target.innerHTML === 'Socket') return;
    // join private room
    this.setState((previousState) => {
      previousState.join = true;
      return previousState;
    })

    that.props.socket.emit('room', e.target.id);

    // listen for messages
    that.props.socket.on('RECEIVE_MESSAGE', data => {
      that.props.addMessage(data);

      // I made this dummy boolean to force the page to rerender.
      // It's probably not right but it works so there.
      that.setState(previousState => {
        previousState.received === !previousState.received;
        return previousState;
      })
    })
  }

  render(){

    const messages = this.props.messages.map((message, i) => {
      const direction = message.admin ? 'msg-receive' : 'msg-send';
      return (
        <div style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}} key={i} className={direction}><b>{message.author}</b>: {message.message}</div>
      )
    })

    const rooms = [];
    let counter = 0;
    for (let key in this.state.rooms) {
      counter += 1;
      rooms.push(
        <div style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}} key={key} id={key} onClick={this.selectUser} className='msg-send'>{counter === 1 ? 'Socket' : `User ${counter}`}</div>
      )
    }

    return !this.props.admin || this.state.join ? (
      <div style={{'position': 'fixed'}}className="chat-box">
        <div className="chat-head">
          <h2 style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>Customer Service Rep</h2>
          <img src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16" onClick={this.toggleChat}/>
        </div>
        <div className="chat-body">
          <div className="msg-insert">
            <div className="messages">
              {messages ? messages : <div></div>}
            </div>
          </div>
          <div className="chat-text">
            <input type="text" placeholder="Message" className="form-control" value={this.state.message} onKeyDown={ev => {if(ev.keyCode === 13){this.sendMessage(ev)}}} onChange={ev => this.setState({message: ev.target.value})}/>
          </div>
          <div className="send">
            <button onClick={this.sendMessage}>SEND</button>
          </div>
        </div>
      </div>
    ) : (
      <div style={{'position': 'fixed'}}className="chat-box">
        <div className="chat-head">
          <h2 style={{fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>Rooms</h2>
          <img src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16" onClick={this.toggleChat}/>
        </div>
        <div className="chat-body">
          <div className="msg-insert">
            <div className="messages">
            {rooms}
            </div>
          </div>
          <div className="chat-text">
            <input type="text" placeholder="Message" className="form-control" value={this.state.message} onKeyDown={ev => {if(ev.keyCode === 13){this.sendMessage(ev)}}} onChange={ev => this.setState({message: ev.target.value})}/>
          </div>
          <div className="send">
            <button onClick={this.sendMessage}>SELECT</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(Chat);