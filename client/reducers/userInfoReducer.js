import * as types from '../constants/actionTypes'
import io from "socket.io-client";

const initialState = {
  username: 'default',
  messages: [],
  socket: io(window.location.href.split('//')[1].split('/')[0]),
  room: null,
  admin: false
}

const userInfoReducer = (state=initialState, action) => {
  const messages = state.messages;

  switch(action.type) {
    case types.INITIALIZE_SOCKET_ROOM:
      return Object.assign(state, { room: action.payload })

    case types.ADD_MESSAGE:
      messages.push(action.payload);
      return Object.assign(state, { messages } )

    case types.UPDATE_USERNAME:
      let name = action.payload.name;
      if (action.payload.admin) name = 'Admin';
      return Object.assign(state, { username: name, admin: action.payload.admin } )

    default:
      return state;
  }
}

export default userInfoReducer;