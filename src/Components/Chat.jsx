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
      // Call OpenAI API with input
      const response = await axios.post(
        'https://api-v2.longshot.ai/custom/api/generate/instruct',
        { text: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 57fbab915f284eb5201214afcf007242f8d9ccd8' // Replace <token> with the actual token value
          }
        }
      );

      // Extracting generated content from the API response
      const generatedContent = response.data?.copies?.[0]?.content;

      // Update messages state
      const newMessages = [...messages, { text: input, type: 'user' }, { text: generatedContent, type: 'ai' }];
      setMessages(newMessages);

      // Save chat history to local storage
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(newMessages));
    } catch (error) {
      // Handle error
      console.error('Error calling OpenAI API:', error);
    }

    // Clear input
    setInput('');
  };

  useEffect(() => {
    // Fetch chat history from local storage
    const storedMessages = JSON.parse(localStorage.getItem(`chat-${chatId}`)) || [];
    setMessages(storedMessages);
  }, [chatId]);

  useEffect(() => {
    // Save chat history to local storage
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
  }, [messages, chatId]);

  useEffect(() => {
    // Cleanup when the component unmounts or when a new chat is selected
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
