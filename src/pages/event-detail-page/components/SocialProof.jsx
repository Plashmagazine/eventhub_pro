import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = ({ event }) => {
  return (
    <div className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {event?.attendeeCount?.toLocaleString()}
              </div>
              <div className="text-text-secondary">Confirmados</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Star" size={24} className="text-success" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {event?.rating}
              </div>
              <div className="text-text-secondary">Avaliação Média</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Eye" size={24} className="text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {event?.viewCount?.toLocaleString()}
              </div>
              <div className="text-text-secondary">Visualizações</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Share2" size={24} className="text-secondary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {event?.shareCount?.toLocaleString()}
              </div>
              <div className="text-text-secondary">Compartilhamentos</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">
              O que os participantes dizem
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {event?.testimonials?.map((testimonial, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < testimonial?.rating ? "text-accent fill-current" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 italic">
                    "{testimonial?.comment}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial?.name}</div>
                      <div className="text-sm text-text-secondary">{testimonial?.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Credibility */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <Image
                  src={event?.organizer?.logo}
                  alt={event?.organizer?.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h4 className="text-xl font-bold text-foreground">{event?.organizer?.name}</h4>
                  {event?.organizer?.verified && (
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  )}
                </div>
                <p className="text-text-secondary mb-4">{event?.organizer?.description}</p>
                <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{event?.organizer?.eventsHosted} eventos realizados</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{event?.organizer?.followers} seguidores</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} />
                    <span>{event?.organizer?.rating} avaliação</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {event?.organizer?.badges?.map((badge, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                      title={badge?.name}
                    >
                      <Icon name={badge?.icon} size={20} className="text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Attendees */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Participantes Recentes
            </h3>
            <div className="flex justify-center">
              <div className="flex -space-x-4">
                {event?.recentAttendees?.slice(0, 12)?.map((attendee, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={attendee?.avatar}
                      alt={attendee?.name}
                      className="w-12 h-12 rounded-full border-4 border-background object-cover"
                    />
                    {attendee?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                    )}
                  </div>
                ))}
                {event?.attendeeCount > 12 && (
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-muted flex items-center justify-center">
                    <span className="text-xs font-semibold text-text-secondary">
                      +{(event?.attendeeCount - 12)?.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-text-secondary mt-4">
              Junte-se a {event?.attendeeCount?.toLocaleString()} pessoas que já confirmaram presença
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;