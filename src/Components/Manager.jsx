// ChatManager.js
import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import robo from "../images/robo1.png";
import { Link } from "react-router-dom";

const ChatManager = () => {
  const storedChatIds = JSON.parse(localStorage.getItem("chatIds")) || [];
  const [chatIds, setChatIds] = useState(storedChatIds);
  const [newChatName, setNewChatName] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    const storedChatIds = JSON.parse(localStorage.getItem("chatIds")) || [];
    setChatIds(storedChatIds);
  }, []);

  const handleCreateChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: newChatName || `Chat ${chatIds.length + 1}`,
    };
    setChatIds([...chatIds, newChat]);
    setActiveChatId(newChatId);
    setNewChatName("");

    localStorage.setItem("chatIds", JSON.stringify([...chatIds, newChat]));
  };

  const handleDeleteChat = (chatId) => {
    const updatedChatIds = chatIds.filter((chat) => chat.id !== chatId);
    setChatIds(updatedChatIds);

    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
    localStorage.removeItem(`chat-${chatId}`);

    localStorage.setItem("chatIds", JSON.stringify(updatedChatIds));

    window.location.reload(false);
  };

  const handleSetActiveChat = (chatId) => {
    setActiveChatId(chatId);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="logoo">
        <Link to='/'><img className="logoImg" src={robo} alt="" /> ROBO <span>CHAT</span></Link>
        <div className="burger-menu" onClick={() => toggleSidebar()}>
          All chats 
        </div>
      </div>

      <div className="chat-manager-container">
        <div className="left">
          <div className="create-chat">
            <input
              className="inputField"
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Enter chat name"
            />
            <button className="buttt" onClick={handleCreateChat}>
              Create New Chat
            </button>
          </div>
          <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
            {chatIds.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSetActiveChat(chat.id)}
                className={`chat-item ${
                  activeChatId === chat.id ? "active" : ""
                }`}
              >
                {chat.name}
                <button
                  className="but"
                  onClick={() => handleDeleteChat(chat.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-area">
          {activeChatId && (
            <Chat
              key={activeChatId}
              chatId={activeChatId}
              onDelete={handleDeleteChat}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatManager;
