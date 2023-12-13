// ChatManager.js
import React, { useState, useEffect } from 'react';
import Chat from './Chat';


const ChatManager = () => {
  const storedChatIds = JSON.parse(localStorage.getItem('chatIds')) || [];
  const [chatIds, setChatIds] = useState(storedChatIds);
  const [newChatName, setNewChatName] = useState('');
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    // Load chatIds from local storage
    const storedChatIds = JSON.parse(localStorage.getItem('chatIds')) || [];
    setChatIds(storedChatIds);
  }, []);

  const handleCreateChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = { id: newChatId, name: newChatName || `Chat ${chatIds.length + 1}` };
    setChatIds([...chatIds, newChat]);
    setActiveChatId(newChatId);
    setNewChatName('');

    // Save updated chatIds to local storage
    localStorage.setItem('chatIds', JSON.stringify([...chatIds, newChat]));
  };

  const handleDeleteChat = (chatId) => {
    const updatedChatIds = chatIds.filter((chat) => chat.id !== chatId);
    setChatIds(updatedChatIds);

    if (activeChatId === chatId) {
      setActiveChatId(null);
    }

    // Remove chat history from local storage
    localStorage.removeItem(`chat-${chatId}`);

    // Save updated chatIds to local storage
    localStorage.setItem('chatIds', JSON.stringify(updatedChatIds));
    
    window.location.reload(false)
  };


  const handleSetActiveChat = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <div className="chat-manager-container">
    <div className="left">
      <div className="create-chat">
        <input className='inputField' type="text" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} placeholder="Enter chat name" />
        <button className='buttt' onClick={handleCreateChat}>Create New Chat</button>
      </div>
      <div className="sidebar">
        {chatIds.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleSetActiveChat(chat.id)}
            className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
          >
            {chat.name}
            <button className='but' onClick={() => handleDeleteChat(chat.id)}>Delete</button>
          </div>
        ))}
      </div>
      </div>
      <div className="chat-area">
        {activeChatId && <Chat key={activeChatId} chatId={activeChatId} onDelete={handleDeleteChat} />}
      </div>
    </div>
  );
};

export default ChatManager;
