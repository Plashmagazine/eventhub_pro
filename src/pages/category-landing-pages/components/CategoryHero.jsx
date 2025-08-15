import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryHero = ({ category, onCategoryChange }) => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={category?.heroImage}
          alt={`${category?.name} culture background`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      {/* Category Navigation */}
      <div className="absolute top-20 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4">
            {category?.allCategories?.map((cat) => (
              <button
                key={cat?.id}
                onClick={() => onCategoryChange(cat)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-brand ${
                  cat?.id === category?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm'
                }`}
              >
                <Icon name={cat?.icon} size={16} />
                <span className="font-medium">{cat?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Category Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-conversion-accent rounded-full flex items-center justify-center">
              <Icon name={category?.icon} size={40} color="white" />
            </div>

            {/* Category Title */}
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl mb-6 text-reveal">
              {category?.name}
            </h1>

            {/* Manifesto */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 leading-relaxed opacity-90">
              {category?.manifesto}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  {category?.stats?.events}
                </div>
                <div className="text-sm opacity-80">Eventos Ativos</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-conversion-accent">
                  {category?.stats?.community}
                </div>
                <div className="text-sm opacity-80">Comunidade</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success">
                  {category?.stats?.locations}
                </div>
                <div className="text-sm opacity-80">Cidades</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="default" 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-black font-bold px-8"
              >
                Explorar Eventos
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8"
              >
                Criar Evento
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="ChevronDown" size={32} />
      </div>
    </div>
  );
};

export default CategoryHero;