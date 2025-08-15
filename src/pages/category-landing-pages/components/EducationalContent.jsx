import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationalContent = ({ category }) => {
  const [activeTab, setActiveTab] = useState('tutorials');

  const tabs = {
    tutorials: {
      title: 'Tutoriais',
      icon: 'Play',
      content: category?.educational?.tutorials
    },
    gear: {
      title: 'Equipamentos',
      icon: 'Settings',
      content: category?.educational?.gearGuides
    },
    history: {
      title: 'História',
      icon: 'BookOpen',
      content: category?.educational?.culturalHistory
    }
  };

  const TutorialCard = ({ tutorial }) => (
    <div className="group bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tutorial?.thumbnail}
          alt={tutorial?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-brand"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-brand" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-brand">
            <Icon name="Play" size={24} color="white" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-white text-sm">
          {tutorial?.duration}
        </div>

        {/* Difficulty Level */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            tutorial?.difficulty === 'Iniciante' ?'bg-success text-success-foreground'
              : tutorial?.difficulty === 'Intermediário' ?'bg-warning text-warning-foreground' :'bg-error text-error-foreground'
          }`}>
            {tutorial?.difficulty}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-primary">
          {tutorial?.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {tutorial?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={tutorial?.instructor?.avatar}
              alt={tutorial?.instructor?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-text-secondary">
              {tutorial?.instructor?.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Eye" size={14} />
            <span className="text-sm">{tutorial?.views}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const GearCard = ({ gear }) => (
    <div className="bg-card rounded-xl p-6 shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={gear?.image}
            alt={gear?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-primary mb-1">{gear?.name}</h3>
          <p className="text-sm text-text-secondary">{gear?.category}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{gear?.price}</div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={i < gear?.rating ? 'text-accent fill-current' : 'text-muted'}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {gear?.description}
      </p>

      <div className="flex items-center space-x-2 mb-4">
        {gear?.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Button variant="outline" size="sm" fullWidth>
        Ver Detalhes
      </Button>
    </div>
  );

  const HistoryCard = ({ history }) => (
    <div className="bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Icon name={history?.icon} size={32} color="white" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-accent">{history?.period}</span>
          <div className="w-1 h-1 bg-text-secondary rounded-full" />
          <span className="text-sm text-text-secondary">{history?.location}</span>
        </div>

        <h3 className="font-bold text-lg text-primary mb-3">{history?.title}</h3>
        
        <p className="text-sm text-text-secondary mb-4 line-clamp-4">
          {history?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>{history?.readTime} min de leitura</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ler Mais
            <Icon name="ArrowRight" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Centro de Conhecimento
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Aprenda, evolua e se conecte com a essência da cultura {category?.name?.toLowerCase()}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-muted rounded-lg p-1 flex">
            {Object.entries(tabs)?.map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-brand font-medium ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'tutorials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs?.tutorials?.content?.map((tutorial) => (
                <TutorialCard key={tutorial?.id} tutorial={tutorial} />
              ))}
            </div>
          )}

          {activeTab === 'gear' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tabs?.gear?.content?.map((gear) => (
                <GearCard key={gear?.id} gear={gear} />
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs?.history?.content?.map((history) => (
                <HistoryCard key={history?.id} history={history} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">
            Quer Contribuir?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Compartilhe seu conhecimento com a comunidade. Crie tutoriais, avalie equipamentos ou conte a história da sua região.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="default" size="lg">
              Criar Conteúdo
            </Button>
            <Button variant="outline" size="lg">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalContent;