"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Avatar = ({ senderId }: { senderId: string }) => {
  const initials = senderId.slice(-2).toUpperCase();
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-teal-500",
  ];
  const hash = senderId
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const color = colors[hash % colors.length];

  return (
    <div
      className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white font-semibold text-xs shrink-0`}
    >
      {initials}
    </div>
  );
};

export default function Page() {
  // 1. Get socketId from the hook
  const { sendMessage, messages, currentServer, setCurrentServer, socketId } =
    useSocket();
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // Updated demoMessages to include senderId
  const demoMessages = [
    {
      text: "...",
      sender: "other",
      senderId: " ",
    },
    {
      text: "...",
      sender: "other",
      senderId: "",
    }
  ];

  // 2. Update chatData map to include the senderId
  const chatData =
    messages.length > 0
      ? messages.map((m) => ({
          text: m.message,
          sender: m.senderId === socketId ? "me" : "other",
          senderId: m.senderId, // Pass this through for the avatar/name
        }))
      : demoMessages;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (No changes) */}
      <div className="hidden md:flex flex-col w-1/3 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Vynce</h1>
          <div className="flex gap-3">
            <span className="text-gray-500 cursor-pointer">🔍</span>
            <span className="text-gray-500 cursor-pointer">⚙️</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {String.fromCharCode(65 + i)}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">User {i + 1}</h3>
                <p className="text-sm text-gray-500 truncate">
                  Last message preview...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header (No changes) */}
        <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              V
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Vynce User</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={currentServer}
              onChange={(e) => setCurrentServer(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="prod">prod</option>
              <option value="4000">4000</option>
              <option value="4001">4001</option>
              <option value="4002">4002</option>
              <option value="4003">4003</option>
            </select>
            <span className="text-gray-500 cursor-pointer">📞</span>
            <span className="text-gray-500 cursor-pointer">🎥</span>
            <span className="text-gray-500 cursor-pointer">⋮</span>
          </div>
        </div>

        {/* --- MESSAGES (Updated Logic) --- */}
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-1">
          {chatData.map((m, i) => {
            // Check if the previous message is from the same sender
            const prevMessage = i > 0 ? chatData[i - 1] : null;
            const showDetails = !prevMessage || prevMessage.senderId !== m.senderId;

            // 'me' sender
            if (m.sender === "me") {
              return (
                <div
                  key={i}
                  className={`flex justify-end ${showDetails ? "mt-3" : "mt-0.5"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm bg-blue-500 text-white overflow-hidden wrap-anywhere ${
                      showDetails ? "rounded-br-none" : ""
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            }

            // 'other' sender
            return (
              <div
                key={i}
                // Use `items-end` to align avatar to the bottom of the bubble block
                className={`flex justify-start items-end gap-2.5 ${
                  showDetails ? "mt-3" : "mt-0.5"
                }`}
              >
                {/* Avatar Column */}
                <div className="w-8 shrink-0">
                  {showDetails && <Avatar senderId={m.senderId} />}
                </div>

                {/* Name + Bubble Column */}
                <div className="flex flex-col">
                  {/* Show name/ID only if it's the first in a group */}
                  {showDetails && (
                    <span className="text-xs text-gray-500 mb-0.5 ml-2 truncate">
                      {m.senderId}
                    </span>
                  )}
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm bg-white text-gray-800 border border-gray-200 overflow-hidden wrap-anywhere ${
                      showDetails ? "rounded-bl-none" : ""
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input (No changes) */}
        <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-5 py-2 rounded-full shadow-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
