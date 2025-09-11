
import React from 'react';
import { Conversation } from '../../types';
import { ChatBubbleLeftRightIcon } from '../icons/Icons';

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, onSelectConversation }) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-300 mb-2" />
        <h3 className="font-semibold text-gray-700">Belum Ada Percakapan</h3>
        <p className="text-sm text-gray-500">Mulai chat dengan penjual dari halaman produk.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul>
        {conversations.map(convo => {
          const lastMessage = convo.messages[convo.messages.length - 1];
          return (
            <li key={convo.id}>
              <button
                onClick={() => onSelectConversation(convo.id)}
                className="w-full text-left p-3 flex items-center space-x-3 hover:bg-gray-50 border-b transition-colors"
              >
                <img
                  src={convo.productImageUrl}
                  alt={convo.productName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 truncate">{convo.sellerName}</p>
                    {convo.unreadByBuyer && (
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 ml-2"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    <span className="font-medium">{convo.productName}</span>
                  </p>
                  {lastMessage && (
                     <p className={`text-sm truncate ${convo.unreadByBuyer ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                        {lastMessage.sender === 'buyer' ? 'Anda: ' : ''}{lastMessage.text}
                     </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationList;
