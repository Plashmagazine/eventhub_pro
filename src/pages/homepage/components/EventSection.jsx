import React from 'react';
import EventCard from './EventCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventSection = ({ title, subtitle, events, type, icon, color, showViewAll = true }) => {
  const getSectionIcon = () => {
    switch (type) {
      case 'upcoming':
        return 'Calendar';
      case 'live':
        return 'Radio';
      case 'past':
        return 'Archive';
      default:
        return icon || 'Calendar';
    }
  };

  const getSectionColor = () => {
    switch (type) {
      case 'upcoming':
        return 'text-accent';
      case 'live':
        return 'text-success';
      case 'past':
        return 'text-text-secondary';
      default:
        return color || 'text-primary';
    }
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-muted ${getSectionColor()}`}>
            <Icon name={getSectionIcon()} size={24} />
          </div>
          <div>
            <h2 className="font-headline text-2xl lg:text-3xl text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-text-secondary mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {showViewAll && (
          <Button 
            variant="outline" 
            iconName="ArrowRight" 
            iconPosition="right"
          >
            Ver Todos
          </Button>
        )}
      </div>
      {/* Events Grid */}
      {events?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events?.map((event) => (
            <EventCard 
              key={event?.id} 
              event={event} 
              type={type}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="font-value-prop text-lg text-foreground mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-text-secondary">
            {type === 'upcoming' && 'Novos eventos serão adicionados em breve.'}
            {type === 'live' && 'Nenhum evento acontecendo no momento.'}
            {type === 'past' && 'Histórico de eventos será exibido aqui.'}
          </p>
        </div>
      )}
      {/* Live Events Special Features */}
      {type === 'live' && events?.length > 0 && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="font-medium text-success">Transmissão ao vivo ativa</span>
          </div>
          <p className="text-sm text-text-secondary">
            {events?.reduce((total, event) => total + (event?.liveViewers || 0), 0)?.toLocaleString('pt-BR')} pessoas assistindo agora
          </p>
        </div>
      )}
      {/* Upcoming Events Countdown */}
      {type === 'upcoming' && events?.length > 0 && (
        <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="font-medium text-accent">Próximos eventos</span>
          </div>
          <p className="text-sm text-text-secondary">
            {events?.length} eventos programados para as próximas semanas
          </p>
        </div>
      )}
    </section>
  );
};

export default EventSection;