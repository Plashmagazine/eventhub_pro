import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LiveChat = ({ eventId, isLive }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(isLive);
  const messagesEndRef = useRef(null);

  // Mock chat messages
  const mockMessages = [
    {
      id: 1,
      user: "Carlos Silva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      message: "Que energia incrível! 🔥",
      timestamp: new Date(Date.now() - 300000),
      isModerator: false
    },
    {
      id: 2,
      user: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      message: "Primeira vez assistindo um evento assim, estou amando!",
      timestamp: new Date(Date.now() - 240000),
      isModerator: false
    },
    {
      id: 3,
      user: "EventHub Moderador",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      message: "Bem-vindos ao chat! Mantenham o respeito e divirtam-se! 🎉",
      timestamp: new Date(Date.now() - 180000),
      isModerator: true
    },
    {
      id: 4,
      user: "Pedro Santos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      message: "Alguém sabe quando vai começar a próxima apresentação?",
      timestamp: new Date(Date.now() - 120000),
      isModerator: false
    },
    {
      id: 5,
      user: "Maria Oliveira",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      message: "A qualidade da transmissão está perfeita! 👏",
      timestamp: new Date(Date.now() - 60000),
      isModerator: false
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage?.trim() || !isConnected) return;

    const message = {
      id: Date.now(),
      user: "Você",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      message: newMessage,
      timestamp: new Date(),
      isModerator: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Chat ao Vivo</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`}></div>
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages?.map((message) => (
          <div key={message?.id} className="flex space-x-3">
            <img
              src={message?.avatar}
              alt={message?.user}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`font-medium text-sm ${
                  message?.isModerator ? 'text-primary' : 'text-foreground'
                }`}>
                  {message?.user}
                </span>
                {message?.isModerator && (
                  <Icon name="Shield" size={12} className="text-primary" />
                )}
                <span className="text-xs text-muted-foreground">
                  {formatTime(message?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-foreground break-words">
                {message?.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        {isConnected ? (
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              className="flex-1"
              disabled={!isConnected}
            />
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!newMessage?.trim() || !isConnected}
            >
              <Icon name="Send" size={16} />
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Chat indisponível no momento
            </p>
            <Button variant="outline" size="sm" disabled>
              <Icon name="Wifi" size={16} className="mr-2" />
              Reconectar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;