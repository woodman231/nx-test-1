import React from 'react';
import io, { Socket } from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);

interface SocketProviderProps {    
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io({
    path: '/api/socket.io'
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};