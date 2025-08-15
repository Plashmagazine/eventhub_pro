import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, type = 'upcoming' }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'live':
        return 'bg-success text-success-foreground';
      case 'past':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const getStatusText = () => {
    switch (type) {
      case 'live':
        return 'AO VIVO';
      case 'past':
        return 'FINALIZADO';
      default:
        return 'EM BREVE';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCountdown = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diff = eventDate - now;
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover-lift cultural-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {type === 'live' && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>{getStatusText()}</span>
            </div>
          )}
          {type !== 'live' && <span>{getStatusText()}</span>}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {event?.category}
        </div>

        {/* Countdown Timer for Upcoming Events */}
        {type === 'upcoming' && formatCountdown(event?.date) && (
          <div className="absolute bottom-3 left-3 bg-conversion-accent text-conversion-accent-foreground px-2 py-1 rounded text-sm font-medium">
            {formatCountdown(event?.date)}
          </div>
        )}

        {/* Live Viewer Count */}
        {type === 'live' && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>{event?.liveViewers?.toLocaleString('pt-BR')}</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-value-prop text-lg text-foreground line-clamp-2 flex-1">
            {event?.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-text-secondary text-sm mb-3">
          <Icon name="MapPin" size={14} />
          <span>{event?.location}</span>
        </div>

        <div className="flex items-center space-x-2 text-text-secondary text-sm mb-4">
          <Icon name="Calendar" size={14} />
          <span>{formatDate(event?.date)}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{event?.attendees?.toLocaleString('pt-BR')}</span>
            </div>
            {event?.rating && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span>{event?.rating}</span>
              </div>
            )}
          </div>
          
          {event?.price && (
            <div className="text-primary font-medium">
              {event?.price === 0 ? 'Gratuito' : `R$ ${event?.price?.toFixed(2)}`}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex space-x-2">
          {type === 'live' && (
            <Button 
              variant="default" 
              fullWidth
              className="bg-success hover:bg-success/90"
              iconName="Play"
              iconPosition="left"
            >
              Assistir Ao Vivo
            </Button>
          )}
          
          {type === 'upcoming' && (
            <Button 
              variant="default" 
              fullWidth
              className="bg-conversion-accent hover:bg-conversion-accent/90"
              iconName="Calendar"
              iconPosition="left"
            >
              Garantir Vaga
            </Button>
          )}
          
          {type === 'past' && (
            <Button 
              variant="outline" 
              fullWidth
              iconName="Image"
              iconPosition="left"
            >
              Ver Galeria
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;