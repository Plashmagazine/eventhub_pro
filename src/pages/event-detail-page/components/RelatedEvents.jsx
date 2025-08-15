import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedEvents = ({ events }) => {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Eventos Relacionados
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Descubra outros eventos que podem interessar você baseados em suas preferências
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-brand-card transition-brand group"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event?.image}
                    alt={event?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-brand"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Event Status Badge */}
                  <div className="absolute top-4 left-4">
                    {event?.status === 'live' && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span>AO VIVO</span>
                      </div>
                    )}
                    {event?.status === 'upcoming' && (
                      <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        EM BREVE
                      </div>
                    )}
                  </div>

                  {/* Save Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-micro">
                    <Icon name="Heart" size={16} />
                  </button>

                  {/* Event Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {event?.category}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {event?.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {event?.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Calendar" size={14} />
                      <span>{event?.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Clock" size={14} />
                      <span>{event?.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="MapPin" size={14} />
                      <span>{event?.location}</span>
                    </div>
                  </div>

                  {/* Event Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{event?.attendees}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} />
                        <span>{event?.rating}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {event?.price === 0 ? 'Gratuito' : `R$ ${event?.price}`}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link to="/event-detail-page" className="flex-1">
                      <Button variant="outline" fullWidth size="sm">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-conversion-accent hover:bg-conversion-accent/90"
                      iconName="Ticket"
                    >
                      Ingresso
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Link to="/category-landing-pages">
              <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
                Ver Mais Eventos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedEvents;