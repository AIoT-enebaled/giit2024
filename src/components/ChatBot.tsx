import React, { useState } from 'react';
import ChatbotService from '../chatbot/ChatbotService';

interface Message {
  content: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hi! I'm the GiiT Assistant. I can help you learn about our courses and programs. What would you like to know?",
    sender: 'bot'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatbotService = ChatbotService.getInstance();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, {
      content: userMessage,
      sender: 'user'
    }]);

    try {
      const response = await chatbotService.getResponse(userMessage);
      
      // Add bot response
      setMessages(prev => [...prev, {
        content: response,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "I'm sorry, I'm having trouble right now. Please try again in a moment.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat with GiiT Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
