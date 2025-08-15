import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import BadgeSystem from './components/BadgeSystem';
import EventTimeline from './components/EventTimeline';
import CultureTracker from './components/CultureTracker';
import SocialConnections from './components/SocialConnections';
import PreferencesPanel from './components/PreferencesPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPreferences, setShowPreferences] = useState(false);

  // Mock user data
  const userData = {
    id: 1,
    name: "Marina Santos",
    username: "marina_cultura",
    bio: "Apaixonada por cultura urbana e eventos únicos. Sempre em busca da próxima experiência incrível! 🎨🎵",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    location: "São Paulo, SP",
    joinDate: "Mar 2023",
    verified: true
  };

  const userStats = [
    { label: "Eventos", value: "47" },
    { label: "Culturas", value: "8" },
    { label: "Seguidores", value: "1.2K" },
    { label: "Seguindo", value: "234" }
  ];

  const badges = [
    {
      id: 1,
      name: "Explorador Cultural",
      description: "Participou de 5 categorias diferentes",
      icon: "Compass",
      earned: true,
      gradient: "from-primary to-secondary",
      requirement: ""
    },
    {
      id: 2,
      name: "Skatista Dedicado",
      description: "10 eventos de skate",
      icon: "Zap",
      earned: true,
      gradient: "from-accent to-warning",
      requirement: ""
    },
    {
      id: 3,
      name: "Influenciador",
      description: "1000+ seguidores",
      icon: "Users",
      earned: true,
      gradient: "from-conversion-accent to-secondary",
      requirement: ""
    },
    {
      id: 4,
      name: "Fotógrafo de Eventos",
      description: "50 fotos compartilhadas",
      icon: "Camera",
      earned: false,
      gradient: "from-success to-primary",
      requirement: "Compartilhe 15 fotos"
    },
    {
      id: 5,
      name: "Madrugador",
      description: "5 eventos antes das 10h",
      icon: "Sun",
      earned: false,
      gradient: "from-urban-pulse to-accent",
      requirement: "Participe de 3 eventos matinais"
    },
    {
      id: 6,
      name: "Veterano",
      description: "1 ano na plataforma",
      icon: "Award",
      earned: false,
      gradient: "from-error to-warning",
      requirement: "Aguarde até Mar 2024"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Skatista Dedicado",
      description: "Completou 10 eventos de skate",
      icon: "Zap",
      gradient: "from-accent to-warning",
      date: "2 dias atrás"
    },
    {
      id: 2,
      title: "Explorador Cultural",
      description: "Participou de 5 categorias diferentes",
      icon: "Compass",
      gradient: "from-primary to-secondary",
      date: "1 semana atrás"
    }
  ];

  const eventHistory = [
    {
      id: 1,
      title: "Street Art Festival 2024",
      category: "Arte Urbana",
      location: "Vila Madalena",
      date: "15 Ago 2024",
      time: "14:00",
      status: "attended",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      memories: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100"
      ]
    },
    {
      id: 2,
      title: "Campeonato de Skate Urbano",
      category: "Skate",
      location: "Ibirapuera",
      date: "22 Ago 2024",
      time: "16:00",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 3,
      title: "Festival de Música Eletrônica",
      category: "Música",
      location: "Anhembi",
      date: "30 Ago 2024",
      time: "20:00",
      status: "wishlist",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      id: 4,
      title: "Exposição de Grafite",
      category: "Arte",
      location: "Centro Cultural",
      date: "10 Ago 2024",
      time: "10:00",
      status: "attended",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      memories: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100"
      ]
    }
  ];

  const cultureData = [
    {
      id: 1,
      name: "Skate",
      icon: "Zap",
      events: 12,
      level: 3,
      levelProgress: 75,
      nextLevelEvents: 3,
      bgColor: "bg-accent",
      progressColor: "bg-accent",
      levelColor: "bg-accent/60",
      recentEvent: {
        name: "Campeonato Urbano",
        date: "15 Ago",
        rating: 4.8
      }
    },
    {
      id: 2,
      name: "Arte Urbana",
      icon: "Palette",
      events: 8,
      level: 2,
      levelProgress: 60,
      nextLevelEvents: 2,
      bgColor: "bg-conversion-accent",
      progressColor: "bg-conversion-accent",
      levelColor: "bg-conversion-accent/60",
      recentEvent: {
        name: "Street Art Festival",
        date: "12 Ago",
        rating: 4.9
      }
    },
    {
      id: 3,
      name: "Música",
      icon: "Music",
      events: 15,
      level: 4,
      levelProgress: 25,
      nextLevelEvents: 5,
      bgColor: "bg-success",
      progressColor: "bg-success",
      levelColor: "bg-success/60",
      recentEvent: {
        name: "Festival Eletrônico",
        date: "08 Ago",
        rating: 4.7
      }
    },
    {
      id: 4,
      name: "BMX",
      icon: "Bike",
      events: 5,
      level: 1,
      levelProgress: 50,
      nextLevelEvents: 5,
      bgColor: "bg-error",
      progressColor: "bg-error",
      levelColor: "bg-error/60",
      recentEvent: {
        name: "Competição BMX",
        date: "05 Ago",
        rating: 4.6
      }
    }
  ];

  const following = [
    {
      id: 1,
      name: "Carlos Oliveira",
      username: "carlos_skate",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true,
      isOnline: true,
      mutualEvents: 5
    },
    {
      id: 2,
      name: "Ana Costa",
      username: "ana_arte",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      verified: false,
      isOnline: false,
      mutualEvents: 3
    }
  ];

  const followers = [
    {
      id: 3,
      name: "Pedro Silva",
      username: "pedro_bmx",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: false,
      isOnline: true,
      isFollowing: false
    },
    {
      id: 4,
      name: "Julia Santos",
      username: "julia_music",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      verified: true,
      isOnline: false,
      isFollowing: true
    }
  ];

  const mutualFriends = [
    {
      id: 5,
      name: "Ricardo Mendes",
      username: "ricardo_cultura",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      verified: false,
      isOnline: true,
      mutualEvents: 8
    }
  ];

  const [preferences, setPreferences] = useState({
    notifications: {
      newEvents: true,
      eventReminders: true,
      followedOrganizers: true,
      newFollowers: false,
      friendsEvents: true,
      mentions: true
    },
    privacy: {
      publicProfile: true,
      showAttendedEvents: true,
      showFollowers: true,
      findByEmail: false,
      autoShareInstagram: false
    },
    discovery: {
      useHistory: true,
      useFriends: true,
      includeOtherCities: false,
      maxDistance: 50
    },
    social: {
      allowFollowers: true,
      showOnlineStatus: true,
      allowMessages: false,
      instagramConnected: true,
      whatsappConnected: false
    }
  });

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'User' },
    { id: 'timeline', label: 'Minha Jornada', icon: 'Clock' },
    { id: 'culture', label: 'Minha Cultura', icon: 'Compass' },
    { id: 'social', label: 'Social', icon: 'Users' }
  ];

  const handleEditProfile = () => {
    setShowPreferences(true);
  };

  const handleUpdatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    setShowPreferences(false);
    // Here you would typically save to backend
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Meu Perfil - EventHub Pro</title>
        <meta name="description" content="Gerencie seu perfil, acompanhe sua jornada cultural e conecte-se com a comunidade EventHub Pro" />
      </Helmet>
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Profile Header */}
          <ProfileHeader
            user={userData}
            stats={userStats}
            onEditProfile={handleEditProfile}
          />

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 bg-card rounded-xl p-2 shadow-brand-card">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-brand font-medium text-sm ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <>
                  <BadgeSystem badges={badges} achievements={achievements} />
                  <EventTimeline events={eventHistory?.slice(0, 3)} />
                </>
              )}

              {activeTab === 'timeline' && (
                <EventTimeline events={eventHistory} />
              )}

              {activeTab === 'culture' && (
                <CultureTracker cultureData={cultureData} />
              )}

              {activeTab === 'social' && (
                <SocialConnections
                  following={following}
                  followers={followers}
                  mutualFriends={mutualFriends}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <CultureTracker cultureData={cultureData?.slice(0, 3)} />
              )}

              {(activeTab === 'timeline' || activeTab === 'culture') && (
                <SocialConnections
                  following={following?.slice(0, 3)}
                  followers={followers?.slice(0, 3)}
                  mutualFriends={mutualFriends?.slice(0, 3)}
                />
              )}

              {activeTab === 'social' && (
                <div className="bg-card rounded-xl shadow-brand-card p-6">
                  <h3 className="font-value-prop text-lg text-text-primary mb-4">
                    Estatísticas Sociais
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Taxa de Engajamento</span>
                      <span className="font-medium text-primary">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Eventos Compartilhados</span>
                      <span className="font-medium text-primary">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Fotos Enviadas</span>
                      <span className="font-medium text-primary">156</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-card rounded-xl shadow-brand-card p-6">
                <h3 className="font-value-prop text-lg text-text-primary mb-4">
                  Ações Rápidas
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth iconName="Calendar">
                    Criar Evento
                  </Button>
                  <Button variant="outline" fullWidth iconName="Search">
                    Descobrir Eventos
                  </Button>
                  <Button variant="outline" fullWidth iconName="Share">
                    Convidar Amigos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-brand-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-headline text-2xl text-text-primary">
                Configurações do Perfil
              </h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowPreferences(false)}
              />
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <PreferencesPanel
                preferences={preferences}
                onUpdatePreferences={handleUpdatePreferences}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileHub;