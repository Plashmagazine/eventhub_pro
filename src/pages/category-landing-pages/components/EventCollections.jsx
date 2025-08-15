import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCollections = ({ category }) => {
  const [activeCollection, setActiveCollection] = useState('imperdíveis');

  const collections = {
    'imperdíveis': {
      title: 'Imperdíveis',
      subtitle: 'Os eventos que definem a cena',
      icon: 'Star',
      events: category?.collections?.mustAttend
    },
    'novos-talentos': {
      title: 'Novos Talentos',
      subtitle: 'A próxima geração em ascensão',
      icon: 'TrendingUp',
      events: category?.collections?.emergingTalents
    },
    'clássicos': {
      title: 'Clássicos',
      subtitle: 'Tradições que nunca saem de moda',
      icon: 'Award',
      events: category?.collections?.classics
    }
  };

  const EventCard = ({ event }) => (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-brand"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Event Status */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event?.status === 'live' ?'bg-error text-error-foreground animate-pulse' 
              : event?.status === 'upcoming' ?'bg-warning text-warning-foreground' :'bg-success text-success-foreground'
          }`}>
            {event?.status === 'live' ? 'AO VIVO' : 
             event?.status === 'upcoming' ? 'EM BREVE' : 'CONFIRMADO'}
          </span>
        </div>

        {/* Save Button */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-brand">
          <Icon name="Heart" size={16} />
        </button>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{event?.title}</h3>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{event?.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{event?.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={event?.organizer?.avatar}
              alt={event?.organizer?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-text-secondary">{event?.organizer?.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Users" size={14} />
            <span className="text-sm font-medium">{event?.attendees}</span>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {event?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            {event?.price === 0 ? 'Gratuito' : `R$ ${event?.price}`}
          </div>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Collection Navigation */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Coleções Especiais
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Eventos cuidadosamente selecionados para cada momento da sua jornada cultural
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(collections)?.map(([key, collection]) => (
              <button
                key={key}
                onClick={() => setActiveCollection(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-brand font-medium ${
                  activeCollection === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon name={collection?.icon} size={18} />
                <span>{collection?.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Collection */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="font-headline text-3xl mb-2 text-primary">
              {collections?.[activeCollection]?.title}
            </h3>
            <p className="text-lg text-text-secondary">
              {collections?.[activeCollection]?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections?.[activeCollection]?.events?.map((event) => (
              <EventCard key={event?.id} event={event} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8"
          >
            Ver Todos os Eventos
            <Icon name="ArrowRight" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventCollections;