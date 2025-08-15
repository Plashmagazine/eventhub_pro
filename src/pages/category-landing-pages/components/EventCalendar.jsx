import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EventCalendar = ({ category }) => {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const viewOptions = [
    { value: 'month', label: 'Mês', icon: 'Calendar' },
    { value: 'week', label: 'Semana', icon: 'CalendarDays' },
    { value: 'list', label: 'Lista', icon: 'List' }
  ];

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days?.push({
        date: prevDate,
        isCurrentMonth: false,
        events: []
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayEvents = category?.eventCalendar?.events?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate?.toDateString() === currentDate?.toDateString();
      });

      days?.push({
        date: currentDate,
        isCurrentMonth: true,
        events: dayEvents
      });
    }

    // Next month's days
    const remainingDays = 42 - days?.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days?.push({
        date: nextDate,
        isCurrentMonth: false,
        events: []
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate?.setMonth(selectedDate?.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const EventDot = ({ event }) => (
    <div
      className={`w-2 h-2 rounded-full ${
        event?.type === 'competition' ? 'bg-error' :
        event?.type === 'workshop' ? 'bg-warning' :
        event?.type === 'festival'? 'bg-success' : 'bg-primary'
      }`}
      title={event?.title}
    />
  );

  const EventListItem = ({ event }) => (
    <div className="bg-card rounded-lg p-4 shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={event?.image}
            alt={event?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-primary truncate">{event?.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
              event?.type === 'competition' ? 'bg-error/10 text-error' :
              event?.type === 'workshop' ? 'bg-warning/10 text-warning' :
              event?.type === 'festival'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
            }`}>
              {event?.type === 'competition' ? 'Competição' :
               event?.type === 'workshop' ? 'Workshop' :
               event?.type === 'festival' ? 'Festival' : 'Evento'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{event?.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{event?.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="Users" size={14} />
              <span className="text-sm">{event?.attendees} participantes</span>
            </div>
            <Button variant="outline" size="sm">
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonthView = () => {
    const days = getDaysInMonth(selectedDate);

    return (
      <div className="bg-card rounded-xl shadow-brand-card overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">
              {months?.[selectedDate?.getMonth()]} {selectedDate?.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                Hoje
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays?.map((day) => (
              <div key={day} className="text-center text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>
        </div>
        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {days?.map((day, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-2 border border-border rounded-lg ${
                  day?.isCurrentMonth 
                    ? 'bg-background hover:bg-muted/50' :'bg-muted/30 text-text-secondary'
                } transition-brand cursor-pointer`}
              >
                <div className="text-sm font-medium mb-1">
                  {day?.date?.getDate()}
                </div>
                <div className="space-y-1">
                  {day?.events?.slice(0, 2)?.map((event, eventIndex) => (
                    <EventDot key={eventIndex} event={event} />
                  ))}
                  {day?.events?.length > 2 && (
                    <div className="text-xs text-text-secondary">
                      +{day?.events?.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="space-y-4">
      {category?.eventCalendar?.events?.map((event) => (
        <EventListItem key={event?.id} event={event} />
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Calendário de Eventos
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Acompanhe a programação completa da cena {category?.name?.toLowerCase()}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            {viewOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setCurrentView(option?.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-brand font-medium ${
                  currentView === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Icon name="Filter" size={16} />
              Filtros
            </Button>
            <Button variant="default">
              <Icon name="Plus" size={16} />
              Criar Evento
            </Button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="mb-8">
          {currentView === 'month' && renderMonthView()}
          {currentView === 'list' && renderListView()}
        </div>

        {/* Legend */}
        <div className="bg-card rounded-xl p-6 shadow-brand-card">
          <h4 className="font-medium text-primary mb-4">Legenda</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-sm text-text-secondary">Competições</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-sm text-text-secondary">Workshops</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-sm text-text-secondary">Festivais</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-sm text-text-secondary">Outros Eventos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;