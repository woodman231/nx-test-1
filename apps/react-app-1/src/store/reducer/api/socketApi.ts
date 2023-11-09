import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectToWebSocket = () => {
  if (!socket) {
    socket = io('YOUR_SOCKET_SERVER_URL'); // Replace with your WebSocket server URL
  }
  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToStream = (callback: (data: Uint8Array) => void) => {
  if (socket) {
    socket.on('stream', callback);
  }
};
