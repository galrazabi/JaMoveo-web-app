// import { io } from 'socket.io-client';
// import { useState, useEffect, createContext } from 'react';
// import {useCookies } from 'react-cookie'

// // const socket = io('http://localhost:8000'); 

// export const SocketContext = createContext();

// export const SocketProvider = ({children}) => { // Wrapper component - to allows SocketProvider to provide the socket instance to any components nested inside it

//     const [socket, setSocket] = useState(null);
//     const [cookie, setCookie] = useCookies(["access_token"]) 

//     useEffect(() => {
//         // Initialize socket connection only once when the provider mounts
//         const newSocket = io('http://localhost:8000');
//         setSocket(newSocket);
//         console.log("Socket connected:", newSocket.id);

//         newSocket.on('disconnect', () => {
//             console.log("Socket disconnected");
//         });

//         // Clean up the socket connection when the component unmounts
//         return () => {
//             newSocket.disconnect();
//             setCookie("access_token", "")
//             window.localStorage.removeItem("userId")
//             window.localStorage.removeItem("isAdmin")
//         };
//     }, []); 

//     return (
//         < SocketContext.Provider  value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

