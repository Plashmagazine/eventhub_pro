import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventHero = ({ event, onRegister }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event?.date]);

  const isLive = event?.status === 'live';
  const isUpcoming = event?.status === 'upcoming';

  return (
    <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <Image
          src={event?.heroImage}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl">
            {/* Event Category & Status */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                {event?.category}
              </span>
              {isLive && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-error text-error-foreground text-sm font-medium rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>AO VIVO</span>
                </div>
              )}
              {event?.verified && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-success text-success-foreground text-sm font-medium rounded-full">
                  <Icon name="CheckCircle" size={14} />
                  <span>VERIFICADO</span>
                </div>
              )}
            </div>

            {/* Event Title */}
            <h1 className="font-headline text-4xl lg:text-6xl text-white mb-4 leading-tight">
              {event?.title}
            </h1>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} />
                </div>
                <div>
                  <p className="text-sm opacity-80">Data</p>
                  <p className="font-semibold">{event?.formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} />
                </div>
                <div>
                  <p className="text-sm opacity-80">Horário</p>
                  <p className="font-semibold">{event?.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} />
                </div>
                <div>
                  <p className="text-sm opacity-80">Local</p>
                  <p className="font-semibold">{event?.venue}</p>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            {isUpcoming && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
                <h3 className="text-white text-lg font-semibold mb-4 text-center">
                  Evento começa em:
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft)?.map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl lg:text-3xl font-bold text-white">
                          {value?.toString()?.padStart(2, '0')}
                        </div>
                        <div className="text-sm text-white/80 capitalize">
                          {unit === 'days' ? 'Dias' : 
                           unit === 'hours' ? 'Horas' : 
                           unit === 'minutes' ? 'Min' : 'Seg'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Activity */}
            {isLive && (
              <div className="bg-error/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-error/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold">
                    Atividade ao Vivo
                  </h3>
                  <div className="flex items-center space-x-2 text-white">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">{event?.liveAttendees} participando</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {event?.liveAvatars?.slice(0, 5)?.map((avatar, index) => (
                      <Image
                        key={index}
                        src={avatar}
                        alt="Participante"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm">
                    e mais {event?.liveAttendees - 5} pessoas estão participando agora
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion-accent hover:bg-conversion-accent/90 text-conversion-accent-foreground font-cta"
                onClick={onRegister}
                iconName="Ticket"
                iconPosition="left"
              >
                {isLive ? 'Participar Agora' : 'Garantir Ingresso'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                iconName="Heart"
                iconPosition="left"
              >
                Salvar Evento
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
                iconName="Share2"
                iconPosition="left"
              >
                Compartilhar
              </Button>
            </div>

            {/* Event Stats */}
            <div className="flex items-center space-x-6 mt-6 text-white/80 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{event?.attendeeCount} confirmados</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>{event?.viewCount} visualizações</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} />
                <span>{event?.rating} ({event?.reviewCount} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>
    </div>
  );
};

export default EventHero;