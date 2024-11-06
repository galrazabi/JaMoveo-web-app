import { io } from 'socket.io-client';
import { createContext } from 'react';

const socket = io('http://localhost:8000'); 

export const SocketContext = createContext();

export const SocketProvider = ({children}) => { // Wrapper component - to allows SocketProvider to provide the socket instance to any components nested inside it
    return (
        < SocketContext.Provider  value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

