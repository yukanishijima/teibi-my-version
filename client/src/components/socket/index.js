// use one socket instance through all components
import io from "socket.io-client";
export const socket = io('/');