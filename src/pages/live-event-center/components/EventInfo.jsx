import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventInfo = ({ event, isLive }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextActivity, setNextActivity] = useState(null);

  // Mock schedule data
  const schedule = [
    {
      id: 1,
      time: "14:00",
      title: "Aquecimento Geral",
      description: "Sessão livre para todos os participantes",
      status: "completed",
      duration: 30
    },
    {
      id: 2,
      time: "14:30",
      title: "Competição Iniciante",
      description: "Primeira categoria da competição",
      status: "completed",
      duration: 45
    },
    {
      id: 3,
      time: "15:15",
      title: "Show Musical - DJ Beats",
      description: "Apresentação especial com DJ local",
      status: "active",
      duration: 30
    },
    {
      id: 4,
      time: "15:45",
      title: "Competição Avançada",
      description: "Categoria principal da competição",
      status: "upcoming",
      duration: 60
    },
    {
      id: 5,
      time: "16:45",
      title: "Premiação",
      description: "Cerimônia de entrega dos prêmios",
      status: "upcoming",
      duration: 30
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const upcoming = schedule?.find(item => item?.status === 'upcoming');
    setNextActivity(upcoming);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'active': return 'Play';
      case 'upcoming': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-primary';
      case 'upcoming': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'active': return 'bg-primary/10';
      case 'upcoming': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {event?.name}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{event?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{event?.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{event?.time}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            {isLive ? (
              <div className="flex items-center space-x-2 bg-error px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">AO VIVO</span>
              </div>
            ) : (
              <div className="bg-muted px-3 py-1 rounded-full">
                <span className="text-muted-foreground text-sm">Aguardando</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-foreground leading-relaxed">
          {event?.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {event?.participants}
              </div>
              <div className="text-xs text-muted-foreground">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {event?.viewers?.toLocaleString('pt-BR') || '0'}
              </div>
              <div className="text-xs text-muted-foreground">Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                R$ {event?.prizePool?.toLocaleString('pt-BR') || '0'}
              </div>
              <div className="text-xs text-muted-foreground">Premiação</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Share" size={16} className="mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Heart" size={16} className="mr-2" />
              Favoritar
            </Button>
          </div>
        </div>
      </div>
      {/* Next Activity */}
      {nextActivity && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Próxima Atividade</h4>
              <p className="text-sm text-muted-foreground">
                {nextActivity?.time} - {nextActivity?.title}
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {nextActivity?.time}
              </div>
              <div className="text-xs text-muted-foreground">
                {nextActivity?.duration}min
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Schedule */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="List" size={20} />
            <span>Programação</span>
          </h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {schedule?.map((item, index) => (
              <div 
                key={item?.id} 
                className={`flex items-center space-x-4 p-3 rounded-lg transition-brand ${
                  item?.status === 'active' ? 'bg-primary/5 border border-primary/20' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusBg(item?.status)}`}>
                    <Icon 
                      name={getStatusIcon(item?.status)} 
                      size={16} 
                      className={getStatusColor(item?.status)} 
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground">
                      {item?.title}
                    </span>
                    {item?.status === 'active' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        AGORA
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item?.description}
                  </p>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div className="font-medium text-foreground">
                    {item?.time}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item?.duration}min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;