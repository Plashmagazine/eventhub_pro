import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunitySpotlight = ({ category }) => {
  const InfluencerCard = ({ influencer }) => (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={influencer?.image}
          alt={influencer?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-brand"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Social Stats */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center space-x-1 text-white text-sm">
            <Icon name="Users" size={14} />
            <span>{influencer?.followers}</span>
          </div>
        </div>

        {/* Influencer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1">{influencer?.name}</h3>
          <p className="text-sm opacity-90 mb-2">{influencer?.title}</p>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{influencer?.location}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {influencer?.bio}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {influencer?.socialLinks?.map((social) => (
              <button
                key={social?.platform}
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:text-primary-foreground transition-brand"
              >
                <Icon name={social?.icon} size={16} />
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            Seguir
          </Button>
        </div>
      </div>
    </div>
  );

  const LocalSceneCard = ({ scene }) => (
    <div className="bg-card rounded-xl p-6 shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={scene?.icon} size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-primary mb-1">{scene?.name}</h3>
          <p className="text-sm text-text-secondary">{scene?.location}</p>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {scene?.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Users" size={14} />
            <span>{scene?.members} membros</span>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Calendar" size={14} />
            <span>{scene?.events} eventos</span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" fullWidth>
        Explorar Cena
      </Button>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Comunidade em Destaque
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Conheça as pessoas e lugares que fazem a diferença na cena {category?.name?.toLowerCase()}
          </p>
        </div>

        {/* Influencers Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                Figuras Influentes
              </h3>
              <p className="text-text-secondary">
                Atletas, artistas e criadores que inspiram a comunidade
              </p>
            </div>
            <Button variant="outline">
              Ver Todos
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category?.communitySpotlight?.influencers?.map((influencer) => (
              <InfluencerCard key={influencer?.id} influencer={influencer} />
            ))}
          </div>
        </div>

        {/* Local Scenes Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                Cenas Locais
              </h3>
              <p className="text-text-secondary">
                Comunidades ativas que movimentam a cultura em suas regiões
              </p>
            </div>
            <Button variant="outline">
              Explorar Mais
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category?.communitySpotlight?.localScenes?.map((scene) => (
              <LocalSceneCard key={scene?.id} scene={scene} />
            ))}
          </div>
        </div>

        {/* Cultural Movements */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">
              Movimentos Culturais
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Iniciativas que estão transformando e expandindo os horizontes da cultura {category?.name?.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category?.communitySpotlight?.culturalMovements?.map((movement) => (
              <div key={movement?.id} className="bg-card rounded-xl p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-conversion-accent to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={movement?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-1">
                      {movement?.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {movement?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{movement?.participants} participantes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{movement?.locations} cidades</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="text-primary">
                  Saiba Mais
                  <Icon name="ArrowRight" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;