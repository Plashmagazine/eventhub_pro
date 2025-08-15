import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventTimeline = ({ events }) => {
  const [activeTab, setActiveTab] = useState('attended');

  const tabs = [
    { id: 'attended', label: 'Participei', icon: 'CheckCircle' },
    { id: 'upcoming', label: 'Próximos', icon: 'Clock' },
    { id: 'wishlist', label: 'Lista de Desejos', icon: 'Heart' }
  ];

  const filteredEvents = events?.filter(event => event?.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'attended': return 'text-success';
      case 'upcoming': return 'text-accent';
      case 'wishlist': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'attended': return 'CheckCircle';
      case 'upcoming': return 'Clock';
      case 'wishlist': return 'Heart';
      default: return 'Calendar';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-value-prop text-xl text-text-primary">
          Minha Jornada Cultural
        </h2>
        <Button variant="outline" size="sm" iconName="Filter">
          Filtrar
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-brand font-medium text-sm flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Timeline */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredEvents?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-text-secondary">
              {activeTab === 'attended' && 'Você ainda não participou de nenhum evento'}
              {activeTab === 'upcoming' && 'Nenhum evento próximo agendado'}
              {activeTab === 'wishlist' && 'Sua lista de desejos está vazia'}
            </p>
          </div>
        ) : (
          filteredEvents?.map((event, index) => (
            <div key={event?.id} className="flex gap-4 group">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(event?.status)} bg-current`} />
                {index < filteredEvents?.length - 1 && (
                  <div className="w-px h-16 bg-border mt-2" />
                )}
              </div>

              {/* Event Card */}
              <div className="flex-1 pb-4">
                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg group-hover:bg-muted transition-brand">
                  <Image
                    src={event?.image}
                    alt={event?.title}
                    className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-text-primary mb-1">
                          {event?.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {event?.category} • {event?.location}
                        </p>
                      </div>
                      <Icon 
                        name={getStatusIcon(event?.status)} 
                        size={16} 
                        className={getStatusColor(event?.status)} 
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        <span>{event?.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>{event?.time}</span>
                      </div>
                      {event?.rating && (
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="text-accent" />
                          <span>{event?.rating}</span>
                        </div>
                      )}
                    </div>

                    {event?.memories && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex -space-x-2">
                          {event?.memories?.slice(0, 3)?.map((memory, idx) => (
                            <Image
                              key={idx}
                              src={memory}
                              alt="Memória do evento"
                              className="w-6 h-6 rounded-full border-2 border-card object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-text-secondary">
                          {event?.memories?.length} fotos
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="xs" iconName="Eye">
                        Ver Detalhes
                      </Button>
                      {activeTab === 'wishlist' && (
                        <Button variant="ghost" size="xs" iconName="X" className="text-error">
                          Remover
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventTimeline;