

import React from 'react';
import { Conversation } from '../../types';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import { CloseIcon, ChatBubbleLeftRightIcon } from '../icons/Icons';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onBackToList: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onBackToList,
}) => {
  if (!isOpen) return null;

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="bg-white rounded-lg shadow-xl border flex flex-col w-[calc(100vw-2rem)] h-[70vh] sm:w-96 sm:h-[500px] max-h-[80vh] animate-scale-in transform-gpu">
        <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold text-gray-800">Pesan</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-grow overflow-hidden relative">
            <div className={`transition-transform duration-300 ease-in-out w-full h-full absolute ${activeConversationId ? '-translate-x-full' : 'translate-x-0'}`}>
                 <ConversationList
                    conversations={conversations}
                    onSelectConversation={onSelectConversation}
                 />
            </div>
            <div className={`transition-transform duration-300 ease-in-out w-full h-full absolute ${activeConversationId ? 'translate-x-0' : 'translate-x-full'}`}>
                {activeConversation && (
                    <ConversationView
                        key={activeConversation.id}
                        conversation={activeConversation}
                        onSendMessage={onSendMessage}
                        onBack={onBackToList}
                    />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;