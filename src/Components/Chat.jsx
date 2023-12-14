// Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Chat = ({ chatId, onDelete }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api-v2.longshot.ai/custom/api/generate/instruct',
        { text: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 57fbab915f284eb5201214afcf007242f8d9ccd8'
          }
        }
      );

      const generatedContent = response.data?.copies?.[0]?.content;
      const newMessages = [...messages, { text: input, type: 'user' }, { text: generatedContent, type: 'ai' }];
      setMessages(newMessages);
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error calling API:', error);
    }
    setInput('');
  };

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`chat-${chatId}`)) || [];
    setMessages(storedMessages);
  }, [chatId]);

  useEffect(() => {
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
  }, [messages, chatId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(`chat-${chatId}`);
    };
  }, [chatId]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="message-input"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="send-button"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
