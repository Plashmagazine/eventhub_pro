import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Campeonato Nacional de Skate",
      subtitle: "São Paulo • 15 de Setembro",
      category: "Skate",
      attendees: 2847,
      isLive: false
    },
    {
      id: 2,
      image: "https://images.pixabay.com/photo/2016/11/29/05/45/adventure-1867285_1280.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Festival de Surf Guarujá",
      subtitle: "Guarujá • Acontecendo Agora",
      category: "Surf",
      attendees: 1523,
      isLive: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "BMX Street Championship",
      subtitle: "Rio de Janeiro • 22 de Setembro",
      category: "BMX",
      attendees: 1876,
      isLive: false
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Festival de Música Urbana",
      subtitle: "Belo Horizonte • 28 de Setembro",
      category: "Música",
      attendees: 5432,
      isLive: false
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentEvent = heroSlides?.[currentSlide];

  return (
    <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-background">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide?.image}
              alt={slide?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentEvent?.category === 'Skate' ? 'bg-accent text-accent-foreground' :
                currentEvent?.category === 'Surf' ? 'bg-success text-success-foreground' :
                currentEvent?.category === 'BMX' ? 'bg-secondary text-secondary-foreground' :
                'bg-conversion-accent text-conversion-accent-foreground'
              }`}>
                {currentEvent?.category}
              </span>
              {currentEvent?.isLive && (
                <div className="flex items-center space-x-1 bg-error text-error-foreground px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-medium">AO VIVO</span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <h1 className="font-headline text-4xl lg:text-6xl text-white mb-4 leading-tight">
              {currentEvent?.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-6">
              {currentEvent?.subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Icon name="Users" size={20} />
                <span className="font-medium">{currentEvent?.attendees?.toLocaleString('pt-BR')} participantes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg"
                className="bg-conversion-accent hover:bg-conversion-accent/90 text-conversion-accent-foreground"
                iconName="Calendar"
                iconPosition="left"
              >
                {currentEvent?.isLive ? 'Participar Agora' : 'Garantir Vaga'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground"
                iconName="Info"
                iconPosition="left"
              >
                Mais Detalhes
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-brand"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-brand"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-brand ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      {/* Brand Tagline */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:block">
        <p className="text-white/80 font-value-prop text-lg">
          Onde a Cultura Acontece
        </p>
      </div>
    </div>
  );
};

export default HeroCarousel;