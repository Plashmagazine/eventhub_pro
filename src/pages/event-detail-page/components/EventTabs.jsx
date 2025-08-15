import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventTabs = ({ event }) => {
  const [activeTab, setActiveTab] = useState('sobre');

  const tabs = [
    { id: 'sobre', label: 'Sobre', icon: 'Info' },
    { id: 'local', label: 'Local', icon: 'MapPin' },
    { id: 'lineup', label: 'Lineup', icon: 'Users' },
    { id: 'galeria', label: 'Galeria', icon: 'Image' },
    { id: 'comunidade', label: 'Comunidade', icon: 'MessageCircle' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sobre':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Sobre o Evento</h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-text-secondary leading-relaxed mb-6">
                  {event?.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Destaques</h4>
                    <ul className="space-y-2">
                      {event?.highlights?.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                          <span className="text-text-secondary">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">O que esperar</h4>
                    <ul className="space-y-2">
                      {event?.expectations?.map((expectation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Star" size={16} className="text-accent mt-1 flex-shrink-0" />
                          <span className="text-text-secondary">{expectation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Media */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Mídia do Evento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event?.media?.map((item, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden">
                    <Image
                      src={item?.url}
                      alt={item?.caption}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{item?.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'local':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Localização</h3>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{event?.venue}</h4>
                    <p className="text-text-secondary">{event?.address}</p>
                    <p className="text-text-secondary">{event?.city}, {event?.state}</p>
                  </div>
                </div>

                {/* Map */}
                <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={event?.venue}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${event?.coordinates?.lat},${event?.coordinates?.lng}&z=15&output=embed`}
                    className="border-0"
                  />
                </div>

                {/* Transportation Options */}
                <div>
                  <h5 className="text-lg font-semibold text-foreground mb-4">Como Chegar</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {event?.transportation?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                        <Icon name={option?.icon} size={20} className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{option?.type}</p>
                          <p className="text-sm text-text-secondary">{option?.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'lineup':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Lineup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event?.lineup?.map((performer, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border hover:shadow-brand-card transition-brand">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={performer?.avatar}
                        alt={performer?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{performer?.name}</h4>
                        <p className="text-text-secondary">{performer?.role}</p>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">{performer?.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{performer?.followers} seguidores</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{performer?.performanceTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'galeria':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Galeria de Fotos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event?.gallery?.map((photo, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <Image
                      src={photo?.url}
                      alt={photo?.caption}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-brand rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-brand">
                      <Icon name="ZoomIn" size={24} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'comunidade':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Comunidade</h3>
              
              {/* Reviews */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-foreground">Avaliações</h4>
                {event?.reviews?.map((review, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review?.avatar}
                        alt={review?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-foreground">{review?.name}</h5>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < review?.rating ? "text-accent fill-current" : "text-muted-foreground"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-text-secondary">{review?.date}</span>
                        </div>
                        <p className="text-text-secondary">{review?.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discussion */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-foreground">Discussões</h4>
                {event?.discussions?.map((discussion, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={discussion?.avatar}
                        alt={discussion?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-foreground">{discussion?.name}</h5>
                          <span className="text-sm text-text-secondary">{discussion?.time}</span>
                        </div>
                        <p className="text-text-secondary mb-3">{discussion?.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <button className="flex items-center space-x-1 hover:text-primary transition-micro">
                            <Icon name="Heart" size={14} />
                            <span>{discussion?.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-primary transition-micro">
                            <Icon name="MessageCircle" size={14} />
                            <span>Responder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-brand whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <div className="container mx-auto px-4 py-12">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EventTabs;