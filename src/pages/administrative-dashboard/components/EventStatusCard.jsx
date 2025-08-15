import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventStatusCard = ({ event }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'draft':
        return 'bg-muted text-text-secondary';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live':
        return 'Ao Vivo';
      case 'upcoming':
        return 'Em Breve';
      case 'draft':
        return 'Rascunho';
      case 'completed':
        return 'Finalizado';
      default:
        return 'Desconhecido';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card hover-lift">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-value-prop text-base text-text-primary truncate">{event?.title}</h3>
          <p className="text-sm text-text-secondary mt-1">{formatDate(event?.date)}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
          {getStatusText(event?.status)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{event?.registrations}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{event?.location}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="xs" className="flex-1">
          <Icon name="Edit" size={14} />
          Editar
        </Button>
        <Button variant="ghost" size="xs">
          <Icon name="MoreHorizontal" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default EventStatusCard;