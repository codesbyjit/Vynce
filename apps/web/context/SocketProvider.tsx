/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
  messages: any[]; // store full message objects with senderId
  currentServer: string;
  setCurrentServer: React.Dispatch<React.SetStateAction<string>>;
  socketId: string | undefined;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`State is Undefined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentServer, setCurrentServer] = useState<string>("prod");

  const sendMessage = useCallback(
    (msg: string) => {
      // The socket.id is automatically available here when sending
      if (socket) socket.emit("event:message", { message: msg, senderId: socket.id });
    },
    [socket]
  );

  const onMessageRec = useCallback((msg: string) => {
    try {
      // This is correct, you are storing the full object
      const parsed = JSON.parse(msg) as { message: string; senderId: string };
      setMessages((prev) => [...prev, parsed]);
    } catch (e) {
      console.log("Server message parse error:", e);
    }
  }, []);

  useEffect(() => {
    const baseURL =
      currentServer === "prod"
        ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
        : `http://localhost:${currentServer}`;

    const _socket = io(baseURL);
    _socket.on("message", onMessageRec);
    setSocket(_socket);

    console.log("🧠 Connected to:", baseURL);

    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRec);
      setSocket(undefined);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentServer]);

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        messages,
        currentServer,
        setCurrentServer,
        socketId: socket?.id,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};