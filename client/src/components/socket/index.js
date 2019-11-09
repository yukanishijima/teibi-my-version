// use one socket instance through all components
import io from "socket.io-client";
export const socket = io('/',{
    transports:['polling', 'websocket'],
    upgrade: true,
    forceNew: false,
    reconnectionAttempts: Infinity,
    reconnection: true,
    reconnectionDelay: 0,
    timeout: 10000,
    autoConnect: true

});

socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });