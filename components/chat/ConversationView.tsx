
import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../../types';
import { ArrowLeftIcon, PaperAirplaneIcon } from '../icons/Icons';

interface ConversationViewProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, text: string) => void;
  onBack: () => void;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isBuyer = message.sender === 'buyer';
  return (
    <div className={`flex ${isBuyer ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-3 py-2 rounded-xl max-w-[80%] ${
          isBuyer ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

const ConversationView: React.FC<ConversationViewProps> = ({ conversation, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(conversation.id, inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-3 border-b flex items-center space-x-3 flex-shrink-0">
        <button onClick={onBack} className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <img
          src={conversation.productImageUrl}
          alt={conversation.productName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-gray-800 leading-tight">{conversation.sellerName}</p>
          <p className="text-xs text-gray-500 leading-tight truncate">{conversation.productName}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {conversation.messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-gray-50 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pesan..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-primary focus:border-primary text-sm"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-primary text-white rounded-full transition-colors hover:bg-primary-dark disabled:bg-primary-light disabled:cursor-not-allowed"
            aria-label="Kirim pesan"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationView;
