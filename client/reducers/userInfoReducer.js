import * as types from '../constants/actionTypes'
import { userInfo } from 'os';
import io from "socket.io-client";

const initialState = {
  username: 'default',
  messages: [],
  socket: io('localhost:3000'),
}

const userInfoReducer = (state=initialState, action) => {
  const messages = state.messages;

  switch(action.type) {
    case types.ADD_MESSAGE:
      messages.push(action.payload);
      return Object.assign(state, { messages } )

    default:
      return state;
  }
}

export default userInfoReducer;