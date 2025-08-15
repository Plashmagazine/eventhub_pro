import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LiveStreamPlayer from './components/LiveStreamPlayer';
import LiveChat from './components/LiveChat';
import SocialWall from './components/SocialWall';
import InteractivePoll from './components/InteractivePoll';
import EventInfo from './components/EventInfo';
import LiveStats from './components/LiveStats';

const LiveEventCenter = () => {
  const [activeTab, setActiveTab] = useState('stream');
  const [isLive, setIsLive] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Mock event data
  const mockEvent = {
    id: 1,
    name: "Campeonato Nacional de Skate Street 2024",
    description: "O maior evento de skate street do Brasil reunindo os melhores atletas do país em uma competição épica. Venha presenciar manobras incríveis e muita adrenalina em uma pista especialmente preparada para este evento histórico.",
    location: "Parque Ibirapuera, São Paulo - SP",
    date: "14 de Agosto, 2024",
    time: "14:00 - 18:00",
    type: "competition",
    participants: 24,
    viewers: 4892,
    prizePool: 50000,
    hashtag: "#EventHubProSkate2024",
    status: "live"
  };

  useEffect(() => {
    setCurrentEvent(mockEvent);
    
    // Simulate live status changes
    const statusTimer = setInterval(() => {
      setIsLive(prev => prev); // Keep live for demo
    }, 30000);

    return () => clearInterval(statusTimer);
  }, []);

  const tabs = [
    { id: 'stream', name: 'Transmissão', icon: 'Play' },
    { id: 'chat', name: 'Chat', icon: 'MessageCircle' },
    { id: 'social', name: 'Social', icon: 'Hash' },
    { id: 'poll', name: 'Enquetes', icon: 'BarChart3' },
    { id: 'info', name: 'Informações', icon: 'Info' },
    { id: 'stats', name: 'Estatísticas', icon: 'TrendingUp' }
  ];

  const toggleNotifications = () => {
    setNotifications(!notifications);
    if (!notifications) {
      // Mock notification permission request
      console.log('Notifications enabled');
    }
  };

  const shareEvent = async () => {
    try {
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: currentEvent?.name || 'EventHub Pro - Evento ao Vivo',
          text: `Assista ao vivo: ${currentEvent?.name || 'Evento especial'}`,
          url: window.location?.href,
        };
        
        // Check if the data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback if data cannot be shared
          fallbackShare();
        }
      } else {
        // Fallback for browsers without Web Share API
        fallbackShare();
      }
    } catch (error) {
      // Handle user cancellation or permission denied
      if (error?.name !== 'AbortError') {
        console.warn('Share failed:', error);
        fallbackShare();
      }
      // If AbortError (user cancelled), do nothing
    }
  };

  const fallbackShare = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard?.writeText) {
        const shareUrl = window.location?.href || '';
        await navigator.clipboard?.writeText(shareUrl);
        
        // Show success feedback
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
        notification.innerHTML = `
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium">Link copiado com sucesso!</span>
          </div>
        `;
        document.body?.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => document.body?.removeChild(notification), 300);
        }, 3000);
      } else {
        // Final fallback - show share URL in a prompt
        const shareUrl = window.location?.href || '';
        const shareText = `${currentEvent?.name || 'Evento ao Vivo'}\n\n${shareUrl}`;
        
        // Create a temporary textarea to select the text
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body?.appendChild(textArea);
        textArea?.focus();
        textArea?.select();
        
        try {
          document.execCommand('copy');
          alert('Link copiado para a área de transferência!');
        } catch (err) {
          // Ultimate fallback - show the URL
          prompt('Copie o link do evento:', shareUrl);
        } finally {
          document.body?.removeChild(textArea);
        }
      }
    } catch (clipboardError) {
      console.warn('Clipboard access failed:', clipboardError);
      // Ultimate fallback
      const shareUrl = window.location?.href || '';
      prompt('Copie o link do evento:', shareUrl);
    }
  };

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground">Carregando evento...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stream':
        return (
          <div className="space-y-6">
            <LiveStreamPlayer 
              event={currentEvent} 
              isLive={isLive} 
              viewerCount={currentEvent?.viewers} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EventInfo event={currentEvent} isLive={isLive} />
              </div>
              <div>
                <LiveStats 
                  isLive={isLive} 
                  eventType={currentEvent?.type} 
                />
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="h-96">
            <LiveChat eventId={currentEvent?.id} isLive={isLive} />
          </div>
        );
      case 'social':
        return <SocialWall eventHashtag={currentEvent?.hashtag} />;
      case 'poll':
        return <InteractivePoll isLive={isLive} />;
      case 'info':
        return <EventInfo event={currentEvent} isLive={isLive} />;
      case 'stats':
        return <LiveStats isLive={isLive} eventType={currentEvent?.type} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Centro de Eventos ao Vivo - EventHub Pro</title>
        <meta name="description" content="Acompanhe eventos ao vivo com transmissão em tempo real, chat interativo e estatísticas detalhadas no EventHub Pro." />
        <meta name="keywords" content="eventos ao vivo, transmissão, chat, skate, competição, EventHub Pro" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  {isLive ? (
                    <div className="flex items-center space-x-2 bg-error px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">AO VIVO</span>
                    </div>
                  ) : (
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-white text-sm">Aguardando</span>
                    </div>
                  )}
                  <span className="text-white/80 text-sm">
                    {currentEvent?.viewers?.toLocaleString('pt-BR')} assistindo
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">Centro de Eventos ao Vivo</h1>
                <p className="text-white/90">
                  Experiência completa com transmissão, chat e interação em tempo real
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleNotifications}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Icon 
                    name={notifications ? "Bell" : "BellOff"} 
                    size={16} 
                    className="mr-2" 
                  />
                  {notifications ? 'Notificações On' : 'Notificações Off'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareEvent}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Icon name="Share" size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-brand font-medium whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>

        {/* Mobile Quick Actions */}
        <div className="fixed bottom-4 right-4 lg:hidden">
          <div className="flex flex-col space-y-2">
            <Button
              variant="default"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg"
              onClick={() => setActiveTab('chat')}
            >
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg"
              onClick={shareEvent}
            >
              <Icon name="Share" size={20} />
            </Button>
          </div>
        </div>

        {/* Notification Banner */}
        {isLive && notifications && (
          <div className="fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span className="text-sm font-medium">
                Momento épico acontecendo agora!
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LiveEventCenter;