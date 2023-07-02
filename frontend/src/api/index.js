import { feathers } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import authentication from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';


const baseURL = 'http://localhost:3030';

// REST setup
const app = feathers();
// Connect to a different URL
const restClient = rest(baseURL);

const apiClient = app.configure(restClient.axios(axios));
apiClient.configure(authentication());
// apiClient.hooks({})


// Socket.io setup
const socket = io(baseURL);
socket.on('connect', () => {
  if (localStorage.getItem('feathers-jwt')) {
    socket.emit('create', 'authentication', {
      strategy: 'jwt',
      accessToken: localStorage.getItem('feathers-jwt'),
      // eslint-disable-next-line no-unused-vars
    }, function (error, newAuthResult) {
    });
  }
});


const socketClient = feathers();
socketClient.configure(socketio(socket));
socketClient.configure(authentication());


export { apiClient, socketClient, socket };
