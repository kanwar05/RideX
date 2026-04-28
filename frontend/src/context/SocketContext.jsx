import React, { createContext, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

export const SocketDataContext = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    // Create socket connection to the backend server
    const socketInstance = io(`${import.meta.env.VITE_BASE_URL}`, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.off("update-location-captain");
      socketInstance.disconnect();
    };
  }, []);

  /**
   * Send message to a specific event
   * @param {string} eventName - Name of the event to emit
   * @param {any} message - Data to send
   */
  const sendMessage = useCallback(
    (eventName, message) => {
      if (socket && isConnected) {
        socket.emit(eventName, message);
        console.log(`Message sent to event '${eventName}':`, message);
      } else {
        console.warn("Socket not connected. Cannot send message.");
      }
    },
    [socket, isConnected],
  );

  /**
   * Listen to a specific event and handle incoming messages
   * @param {string} eventName - Name of the event to listen to
   * @param {function} callback - Function to execute when message is received
   * @returns {function} Cleanup function to remove listener
   */
  const receiveMessage = useCallback(
    (eventName, callback) => {
      if (socket) {
        socket.on(eventName, (data) => {
          console.log(`Message received from event '${eventName}':`, data);
          callback(data);
        });

        // Return cleanup function to remove listener
        return () => {
          socket.off(eventName, callback);
        };
      }
    },
    [socket],
  );

  const value = {
    socket,
    isConnected,
    sendMessage,
    receiveMessage,
  };

  return (
    <SocketDataContext.Provider value={value}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
