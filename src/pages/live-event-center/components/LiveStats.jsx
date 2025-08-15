import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveStats = ({ isLive, eventType }) => {
  const [stats, setStats] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock stats based on event type
  const mockStats = {
    competition: {
      participants: 24,
      completed: 18,
      currentRound: "Semifinal",
      topScore: 9.2,
      averageScore: 7.8,
      spectators: 1247,
      onlineViewers: 3892
    },
    concert: {
      songs: 12,
      currentSong: "Urban Pulse",
      artist: "DJ Beats",
      duration: "1h 45min",
      spectators: 2156,
      onlineViewers: 5643,
      nextArtist: "MC Flow"
    },
    cultural: {
      activities: 8,
      completed: 5,
      currentActivity: "Street Art Demo",
      participants: 156,
      spectators: 892,
      onlineViewers: 2341,
      nextActivity: "Break Dance Battle"
    }
  };

  useEffect(() => {
    setStats(mockStats?.[eventType] || mockStats?.competition);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventType]);

  const renderCompetitionStats = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Participantes</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.completed}/{stats?.participants}
        </div>
        <div className="text-xs text-muted-foreground">
          {Math.round((stats?.completed / stats?.participants) * 100)}% completo
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Trophy" size={16} className="text-warning" />
          <span className="text-sm font-medium text-muted-foreground">Melhor Nota</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.topScore}
        </div>
        <div className="text-xs text-muted-foreground">
          Média: {stats?.averageScore}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-success" />
          <span className="text-sm font-medium text-muted-foreground">Presencial</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.spectators?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">espectadores</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Monitor" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Online</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.onlineViewers?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">visualizações</div>
      </div>

      <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-primary mb-1">
              Fase Atual
            </div>
            <div className="text-lg font-bold text-foreground">
              {stats?.currentRound}
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderConcertStats = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Music" size={16} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Músicas</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.songs}
        </div>
        <div className="text-xs text-muted-foreground">no setlist</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Clock" size={16} className="text-warning" />
          <span className="text-sm font-medium text-muted-foreground">Duração</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.duration}
        </div>
        <div className="text-xs text-muted-foreground">tempo total</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-success" />
          <span className="text-sm font-medium text-muted-foreground">Presencial</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.spectators?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">pessoas</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Monitor" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Online</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.onlineViewers?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">assistindo</div>
      </div>

      <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-primary mb-1">
              Tocando Agora
            </div>
            <div className="text-lg font-bold text-foreground">
              {stats?.currentSong}
            </div>
            <div className="text-sm text-muted-foreground">
              por {stats?.artist}
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Play" size={24} className="text-primary" />
          </div>
        </div>
        
        {stats?.nextArtist && (
          <div className="text-xs text-muted-foreground border-t border-border pt-2">
            Próximo: {stats?.nextArtist}
          </div>
        )}
      </div>
    </div>
  );

  const renderCulturalStats = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Activity" size={16} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Atividades</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.completed}/{stats?.activities}
        </div>
        <div className="text-xs text-muted-foreground">
          {Math.round((stats?.completed / stats?.activities) * 100)}% completo
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Users" size={16} className="text-warning" />
          <span className="text-sm font-medium text-muted-foreground">Participantes</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.participants}
        </div>
        <div className="text-xs text-muted-foreground">ativos</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-success" />
          <span className="text-sm font-medium text-muted-foreground">Presencial</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.spectators?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">espectadores</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Monitor" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Online</span>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {stats?.onlineViewers?.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs text-muted-foreground">visualizações</div>
      </div>

      <div className="col-span-2 bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-primary mb-1">
              Atividade Atual
            </div>
            <div className="text-lg font-bold text-foreground">
              {stats?.currentActivity}
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Palette" size={24} className="text-primary" />
          </div>
        </div>
        
        {stats?.nextActivity && (
          <div className="text-xs text-muted-foreground border-t border-border pt-2">
            Próxima: {stats?.nextActivity}
          </div>
        )}
      </div>
    </div>
  );

  const renderStats = () => {
    switch (eventType) {
      case 'concert': return renderConcertStats();
      case 'cultural': return renderCulturalStats();
      default: return renderCompetitionStats();
    }
  };

  if (!isLive) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground mb-2">Estatísticas ao Vivo</h3>
          <p className="text-sm text-muted-foreground">
            As estatísticas aparecerão aqui durante o evento
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Estatísticas ao Vivo</span>
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">Atualizando</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {renderStats()}
      </div>
    </div>
  );
};

export default LiveStats;