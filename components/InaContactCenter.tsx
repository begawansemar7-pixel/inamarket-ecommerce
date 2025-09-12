import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { CloseIcon, PaperAirplaneIcon, RobotIcon } from './icons/Icons';
import Spinner from './Spinner';

interface InaContactCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InaMessage {
  id: string;
  sender: 'user' | 'ina';
  text: string;
}

const SYSTEM_INSTRUCTION = `Anda adalah INA (Intelligent Network Assistant), seorang agen contact center AI yang ramah dan sangat membantu untuk INAMarket. INAMarket adalah sebuah platform e-commerce yang didedikasikan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.
Tugas utama Anda adalah menjawab pertanyaan pengguna seputar penggunaan platform INAMarket.
Topik yang harus Anda kuasai dan jawab meliputi:
- Cara membeli produk
- Cara mulai berjualan
- Metode pembayaran yang tersedia (Bank Transfer, QRIS)
- Opsi pengiriman
- Cara melacak pesanan
- Kebijakan privasi dan syarat ketentuan
- Cara menghubungi customer service manusia
Gunakan bahasa yang sopan, jelas, dan mudah dimengerti. Jaga agar jawaban tetap singkat dan langsung ke pokok permasalahan.
Jika pengguna menanyakan sesuatu di luar topik INAMarket (misalnya, pertanyaan pengetahuan umum, cuaca, atau topik tidak relevan lainnya), Anda harus dengan sopan menolak untuk menjawab dan mengarahkan percakapan kembali ke topik seputar INAMarket.
Contoh penolakan: "Maaf, saya adalah asisten AI untuk INAMarket dan hanya bisa membantu dengan pertanyaan seputar platform kami. Ada yang bisa saya bantu terkait jual beli di INAMarket?"`;

const InaContactCenter: React.FC<InaContactCenterProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<InaMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize chat session when the modal opens
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      setChat(newChat);
      setMessages([
        {
          id: crypto.randomUUID(),
          sender: 'ina',
          text: 'Halo! Saya INA, asisten AI Anda. Ada yang bisa saya bantu seputar INAMarket?',
        },
      ]);
    } else {
      // Clean up when modal closes
      setChat(null);
      setMessages([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessageText = inputText.trim();
    if (!userMessageText || isLoading || !chat) return;

    const userMessage: InaMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: userMessageText,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessageText });
      const inaMessage: InaMessage = {
        id: crypto.randomUUID(),
        sender: 'ina',
        text: response.text,
      };
      setMessages(prev => [...prev, inaMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage: InaMessage = {
        id: crypto.randomUUID(),
        sender: 'ina',
        text: 'Maaf, terjadi sedikit gangguan. Bisakah Anda mengulangi pertanyaan Anda?',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl flex flex-col w-full max-w-md h-[80vh] max-h-[600px] animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-light/20 p-2 rounded-full">
                <RobotIcon className="w-6 h-6 text-primary-dark" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-800">INA - Pusat Bantuan AI</h2>
                <p className="text-xs text-green-600 font-semibold flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>Online</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ina' && <RobotIcon className="w-6 h-6 text-primary flex-shrink-0 mb-1" />}
              <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <RobotIcon className="w-6 h-6 text-primary flex-shrink-0 mb-1" />
               <div className="px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-none">
                 <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white rounded-b-xl flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pertanyaan Anda..."
              className="w-full px-4 py-2 bg-gray-100 border-transparent rounded-full focus:ring-primary focus:border-primary text-sm"
              autoComplete="off"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-primary text-white rounded-full transition-colors hover:bg-primary-dark disabled:bg-primary-light disabled:cursor-not-allowed"
              aria-label="Kirim pesan"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InaContactCenter;