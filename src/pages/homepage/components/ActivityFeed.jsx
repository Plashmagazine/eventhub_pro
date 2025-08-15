import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  const mockActivities = [
    {
      id: 1,
      type: 'registration',
      user: {
        name: 'Carlos Silva',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      event: 'Campeonato Nacional de Skate',
      timestamp: new Date(Date.now() - 300000),
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'checkin',
      user: {
        name: 'Ana Costa',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      event: 'Festival de Surf Guarujá',
      timestamp: new Date(Date.now() - 600000),
      icon: 'MapPin',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'share',
      user: {
        name: 'Pedro Santos',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      event: 'BMX Street Championship',
      timestamp: new Date(Date.now() - 900000),
      icon: 'Share2',
      color: 'text-secondary'
    },
    {
      id: 4,
      type: 'review',
      user: {
        name: 'Maria Oliveira',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      event: 'Festival de Música Urbana',
      timestamp: new Date(Date.now() - 1200000),
      icon: 'Star',
      color: 'text-accent'
    },
    {
      id: 5,
      type: 'registration',
      user: {
        name: 'João Ferreira',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      event: 'Roller Derby Championship',
      timestamp: new Date(Date.now() - 1500000),
      icon: 'UserPlus',
      color: 'text-success'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: 'registration',
        user: {
          name: 'Novo Usuário',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        },
        event: 'Evento Aleatório',
        timestamp: new Date(),
        icon: 'UserPlus',
        color: 'text-success'
      };
      
      setActivities(prev => [newActivity, ...prev?.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getActivityText = (activity) => {
    switch (activity?.type) {
      case 'registration':
        return `se inscreveu em ${activity?.event}`;
      case 'checkin':
        return `fez check-in em ${activity?.event}`;
      case 'share':
        return `compartilhou ${activity?.event}`;
      case 'review':
        return `avaliou ${activity?.event}`;
      default:
        return `interagiu com ${activity?.event}`;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-value-prop text-xl text-foreground">Atividade em Tempo Real</h3>
        <div className="flex items-center space-x-1 text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium">Ao Vivo</span>
        </div>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-brand">
            <div className="relative">
              <Image
                src={activity?.user?.avatar}
                alt={activity?.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border-2 border-background`}>
                <Icon 
                  name={activity?.icon} 
                  size={12} 
                  className={activity?.color}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity?.user?.name}</span>
                {' '}
                <span className="text-text-secondary">{getActivityText(activity)}</span>
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {formatTimeAgo(activity?.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>+2.847 atividades hoje</span>
          <button className="text-primary hover:text-primary/80 font-medium transition-brand">
            Ver todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;